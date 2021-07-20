// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// pragma solidity >=0.8.6;

contract PushNotifications{
    event NotifyOneInChannel();
    event NotifyAllInChannel();
    
    struct Channel{
        string name;
        string description;
        string iconHash;
        string badgeHash;
        address admin;
        address[] subscribers;
    }
    
    mapping(uint256 => mapping(address => bool)) pushAccess; // mapping of addresses OTHER THAN ADMIN who can send push notifications
    uint256 channelsCount=0; // to access channels and prevent double creation
    mapping (uint256=>Channel) public channels;

    //  user address => channel index => subscription boolean
    mapping (address=>mapping(uint256=>bool)) public subscriptions;  // mapping of addresses who subscribed to channels
    mapping (address=>string) publicKeys; // used for sending notifications privately to one person

    function subscribe(uint256 _channel) public returns (bool){
        require(subscriptions[msg.sender][_channel] != true); // You shouldn't be subscribed already
        subscriptions[msg.sender][_channel] = true;
        channels[_channel].subscribers.push(msg.sender);
        return true;
    }

    function unsubscribe(uint256 _channel) public returns (bool){
        require(
            subscriptions[msg.sender][_channel] == true
        ); // You should be subscribed already, otherwise don't waste gas
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

    function createChannel(string memory _name,
        string memory _description,
        string memory _iconHash,
        string memory _badgeHash
        ) public returns (bool){
        

        // retrieve store
        Channel storage channel = channels[channelsCount];
        channel.name = _name;
        channel.description = _description;
        channel.iconHash = _iconHash;
        channel.badgeHash = _badgeHash;
        channel.admin = msg.sender;

        // first increment channelsCount
        channelsCount += 1;
        return true;
    }

    function notifyOneInChannel(
        string memory _title,
        string memory _action,
        string memory _body,
        string memory _imageHash
    ) public returns (bool){

    }

    // function notifyAll(title,action,body,image) public returns (bool){

    // }
}