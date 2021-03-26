# Describe IPFS and compare it to other protocols e.g., HTTP

The interplanetary file system (IPFS) is a system and protocol that allows for the distribution and retrieval of data over an IP network of computers. It is attempting to perform an equivalent role to the `get` method of `HTTP`.

IPFS is a peer to peer system, where each node participates on an equal footing, as opposed to HTTP where one node (the server) has the data and the other (the client) requests the data.

IPFS allows users to upload data to an IPFS node (an instance of the `IPFS daemon` software) running either on their local computer or a remote server. The uploaded data is given a content identifier (CID) by the IPFS daemon by hashing the complete data (the hashing algorithm and other details for complete reproduction are captured in the CID as well). The same binary data hashed in the same way will have the same CID. The IPFS node then advertises that it has the data that backs that CID to the Distributed Hash Table (DHT). The DHT is a distributed key/value store that maps CIDs to peers so requests for data can be routed. Each IPFS node participates in the DHT, and stores CID to peer records of other nodes. When data is uploaded the IPFS daemon will find a number of peers it is currently connected to and ask them to store the 'CID to its peer address' record.

A user can then provide the CID of their uploaded data to someone else, and they will be able to retrieve that data by querying their IPFS daemon for the CID. Because all IPFS daemons are continuously trying to maintain connections to a wide group of peer nodes (bootstrapped from a known high availability list), a global network of nodes is formed. When the user requests a CID, the IPFS node queries its peers for the CID, if they do not have it they query their peers and so on. Eventually a peer is found with an entry in its part of the DHT for the requested CID and the peer that has it. The IPFS node that originated the request can then open a TCP connection to that storing node and ask it to send the data that backs the CID.

As the CID encodes how the data was hashed, the origin IPFS daemon can verify that it has received the intended data by rehashing and comparing it with the requested CID. If they match we know that we have received the original data. The IPFS node can now advertise that it is able to fulfil requests for the requested CID.

In IPFS then, data is addressed by the hash of its content, whereas in HTTP the data is addressed by the url and parameters of the http request.

In IPFS the data is immutable, the CID addresses an exact set of bits. In HTTP the server can return different bits for the same request at different times.

In HTTP there are special nodes (the servers) that store the data that is to be requested. In IPFS any node can store a copy of the data and advertise it to the network as the node does not need to be trusted if the data can always be trusted (it matches the CID).

IPFS does not have the equivalent of other HTTP methods like 'POST'. To change data, it must be modified and a new CID formed (or patched via IPLD), the references to this data must now be updated, and in a decentralized app that could be all over the internet.

IPFS does not incentivize the storage of data, you are responsible for keeping a node with your important data available. A system like filecoin uses a cryptocurrency to provide this incentive (but also requires a charge for retrieval).
