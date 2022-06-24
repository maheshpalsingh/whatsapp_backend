const { db, admin } = require("../util/admin");

exports.getChannels = async (req, res) => {
  const channelsRef = db.collection("Channels");
  try {
    channelsRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      return res.status(201).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.sendMessage = async (req, res) => {
  const { channelid, senderid, text, recieverid } = req.body;

  // const channelsRef = db.collection("Channels");
  // try {
  //   channelsRef
  //     .doc(channelid)
  //     .collection("messages")
  //     .doc()
  //     .set(
  //       {
  //         type: "text",
  //         sender: senderid,
  //         text: text,
  //         time: new Date(),
  //         seen: false,
  //       },
  //       { merge: true }
  //     )
  //     .then(() => {
  //       res.status(200).send("added");
  //     })
  //     .catch((e) => {
  //       res.status(404).send("Incorrect");
  //     });
  // } catch (error) {
  //   console.log(error);
  //   return res
  //     .status(500)
  //     .json({ general: "Something went wrong, please try again" });
  // }

  db.collection("Users")
    .doc(recieverid)
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        let dS = documentSnapshot.data();
        console.log("User data: ", dS?.fcm);
        const registrationTokens = dS?.fcm;

        const message = {
          notification: { title: dS.name, body: text },
          tokens: registrationTokens,
          data: {
            channelid,
            contactName: dS.name,
            contactNumber: dS.phone,
            recieverid,
          },
        };
        admin
          .messaging()
          .sendMulticast(message)
          .then((response) => {
            console.log(
              response.successCount + " messages were sent successfully"
            );
          });
      }
    });
};

// exports.getChannelsMessage = async (req, res) => {
//     const channelsRef = db.collection('Channels');
//     try{
//             channelsRef
//             .doc('C4E1XKh7MdSK8VOsJPkrmIIa0ev1zUUSrxAXySg34oFNjxXUhKhaW5m2')
//             .collection("messages")
//             .onSnapshot(snapshot => snapshot.docChanges().forEach(
//                   change => {
//                     console.log(change.doc.data());
//                   }))

//     } catch (error) {
//         return res
//         .status(500)
//         .json({ general: "Something went wrong, please try again"});
//     }
// };
