// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PushNotification{
    struct Channel{
        string iconHash;
    }
    mapping (address=>mapping (address=>bool)) public subscriptions;
    mapping (address=>string) publicKeys;

    function subscribe(address _channel) public returns (bool){
        subscriptions[_channel][msg.sender] = true;
        return true;
    }

    function unsubscribe(address _channel) public returns (bool){
        // either the channel or the subscriber should be able to unsubscribe a subscriber
        subscriptions[_channel][msg.sender] = false;
        return true;
    }

    function createChannel(address _channel) public returns (bool){
        return true;
    }


}