// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./PushNotifications.sol";

contract Test{
    PushNotifications pn;
    uint256 channelId;
    string title = "This is a test notification";
    string action = "http://example.com/";
    string body = "If you are reading this, the contract is probably working";
    string imageHash = "bafybeibz5wohmannxrnebzeoxwyubsv5b3onjfkgeg65fjzz7dmgbz4mwi";
    constructor(address _pushNotification,uint256 _channelId) public{
        pn = PushNotifications(_pushNotification);
        channelId = _channelId;
    }

    function testNotification(bool notifyAll) public returns (bool){
        if(notifyAll==true){
            // send a notification to everyone in channel, this 
            // power shouldn't be overused though and should be better
            // guarded in actual programs. This is just a test.
            pn.notifyAllInChannel(
                channelId,
                title,
                action,
                body,
                imageHash
            );
        }
        else{
            // send a targeted notification to the invoker of this function call
            pn.notifyOneInChannel(
                msg.sender,
                channelId,
                title,
                action,
                body,
                imageHash,
                false
            );
        }

        return true;
    }

}