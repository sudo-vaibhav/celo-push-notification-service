// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
// pragma solidity >=0.4.22 <0.9.0;

contract PushNotifications{
    event NotifyOneInChannel(
        address recipient,
        uint256 channel,
        string title,
        string action,
        string body,
        string imageHash,
        bool privateNotification
    );

    event NotifyAllInChannel(
        uint256 channel,
        string title,
        string action,
        string body,
        string imageHash
    );
    
    struct Channel{
        string name;
        string description;
        string iconHash;
        string badgeHash;
        address admin;
        address[] subscribers;
    }
    //      channel index => pushing address => permission boolean
    mapping(uint256 => mapping(address => bool)) public pushAccess; // mapping of addresses OTHER THAN ADMIN who can send push notifications

    Channel[] public channels; // this refers to a dynamic array containing info on various channels

    //  user address => channel index => subscription boolean
    mapping (address=>mapping(uint256=>bool)) public subscriptions;  // mapping of addresses who subscribed to channels
    mapping (address=>string) public publicKeys; // used for sending notifications privately to one person

    function subscribe(uint256 _channel) public returns (bool){
        require(_channel < channels.length,"channel does not exist");
        require(subscriptions[msg.sender][_channel] != true,"You shouldn't be subscribed already");
        subscriptions[msg.sender][_channel] = true;
        channels[_channel].subscribers.push(msg.sender);
        return true;
    }

    function unsubscribe(uint256 _channel) public returns (bool){
        require(_channel < channels.length,"channel does not exist");
        require(
            subscriptions[msg.sender][_channel] == true,
            "You should be subscribed already"
        ); 
        subscriptions[msg.sender][_channel] = false;
        Channel storage channel = channels[_channel];
        uint256 indexToBeDeleted;
        for(uint i=0;i<channel.subscribers.length;i++){
            if(channel.subscribers[i] == msg.sender){
                indexToBeDeleted = i;
                break;
            }
        }

        // replace last element with current element
        channel.subscribers[indexToBeDeleted] = channel.subscribers[channel.subscribers.length-1];

        // remove the last element
        channel.subscribers.pop();
        return true;
    }
    function createChannel(
        string memory _name,
        string memory _description,
        string memory _iconHash,
        string memory _badgeHash
        ) public returns (uint256){
        Channel memory channel;
        channel.name = _name;
        channel.description = _description;
        channel.iconHash = _iconHash;
        channel.badgeHash = _badgeHash;
        channel.admin = msg.sender;
        channels.push(channel);
        return channels.length; // return the new standing count of channels
    }

    function editChannel(
        uint256 _channel,
        string memory _name,
        string memory _description,
        string memory _iconHash,
        string memory _badgeHash
        ) 
    public returns (bool){
        require(_channel < channels.length,"channel does not exist");
        require(msg.sender == channels[_channel].admin,"You must be the channel admin to edit a channel");
        channels[_channel].name = _name;
        channels[_channel].description = _description;
        channels[_channel].iconHash = _iconHash;
        channels[_channel].badgeHash = _badgeHash;
        return true;
    }

    function setPublicKey(string memory _publicKey) public returns (bool){
        publicKeys[msg.sender] = _publicKey;
        return true;
    }

    // this is useful when you want a notification event to be fireable from a contract, you 
    function setPushAccess(uint256 _channel,address _address,bool _access) public returns (bool){
        require(_channel < channels.length,"channel does not exist");
        require(msg.sender == channels[_channel].admin,"You must be the channel admin to set push access");
        pushAccess[_channel][_address] = _access;
        return true;
    }

    // in the case of private notification, it is assumed that fields like title, action, body 
    // and imageHash have already been encrypted by the sender who is compulsarily admin of channel
    // in that case.
    function notifyOneInChannel(
        address _recipient,
        uint256 _channel,
        string memory _title,
        string memory _action,
        string memory _body,
        string memory _imageHash,
        bool _privateNotification
    ) public returns (bool){
        require(_channel < channels.length,"channel does not exist");
        Channel memory channel = channels[_channel];
        // require that the sender is an admin or one of the permissed contracts
        if(_privateNotification){
            require(channel.admin == msg.sender,"sender is not admin of channel, private notification can only be sent admin of channel. Private notifications are disabled for smart contracts since secrets can't be kept on-chain");
        }
        else{
            require(channel.admin == msg.sender || pushAccess[_channel][msg.sender] == true,"public notifications to one person in channel can only be sent by the admin or one of the allowed addresses/contracts");
        }

        require(
            subscriptions[_recipient][_channel] == true,
            "recipient should be subscribed to the channel"
        );

        emit NotifyOneInChannel(
            _recipient,
            _channel,
            _title,
            _action,
            _body,
            _imageHash,
            _privateNotification
        );

        return true;
    }

    function notifyAllInChannel(
        uint256 _channel,
        string memory _title,
        string memory _action, 
        string memory _body,
        string memory _imageHash
    ) public returns (bool){
        require(_channel < channels.length,"channel does not exist");
        Channel memory channel = channels[_channel];
        require(msg.sender == channel.admin || pushAccess[_channel][msg.sender] == true,"sender is not admin of channel or one of the other addresses who have push access");

        emit NotifyAllInChannel(
            _channel,
            _title,
            _action,
            _body,
            _imageHash
        );

        return true;
    }

    function subscribersCountInChannel(uint256 _channel) public view returns (uint256){
        require(_channel < channels.length,"channel does not exist");
        return channels[_channel].subscribers.length;
    }

    function subscribersInChannel(uint256 _channel) public view returns (address [] memory){
        require(_channel < channels.length,"channel does not exist");
        return channels[_channel].subscribers;
    }

    function allChannels() public view returns (Channel[] memory){
        return channels;
    }
}