const Cart = require("./schema/CartSchema.js");
const User = require("./schema/UserSchema.js");
Cart.collection.deleteMany({});
User.collection.deleteMany({});

run()
async function run() {
    User.insertMany([
        { userName: "Mama" },
        { userName: "Tata" },
        { userName: "Pepa" },
        { userName: "Franta" },
        { userName: "Honza" }
    ])

    // const d = await User.findOne({ userName: "Mama" });
    // User.deleteOne(d).then(function () {
    //     console.log("Data deleted"); // Success
    // }).catch(function (error) {
    //     console.log(error); // Failure
    // });

    // const user = await User.create({ userName: "Pepa" });
    // user.userName = "David";
    // await user.save();

    // const user2 = await User.create({ userName: "Pepa" });
    // await user2.save();
    const users = await User.find({});
    //console.log(users);
    u_id = users.map((u) => {
        return u._id;
    })
    //console.log(u_id);

    Cart.insertMany([
        {
            name: "Pecivo",
            owner: u_id[0],
            memberList: [u_id[1], u_id[2], u_id[3], u_id[4]],
            resolved: false,
            itemList: [
                {
                    name: "Rohlik",
                    resolved: false,
                },
                {
                    name: "Chleba",
                    resolved: false,
                }
            ]
        },
        {
            name: "Zelenina",
            owner: u_id[0],
            memberList: [u_id[1], u_id[2], u_id[3], u_id[4]],
            resolved: false,
            itemList: [
                {
                    name: "Rajce",
                    resolved: false,
                },
                {
                    name: "Brambory",
                    resolved: false,
                },
                {
                    name: "Cuketa",
                    resolved: false,
                }
            ]
        },
        {
            name: "Sladkosti",
            owner: u_id[1],
            memberList: [u_id[2], u_id[3], u_id[4]],
            resolved: true,
            itemList: [
                {
                    name: "Zmrzlina",
                    resolved: false,
                },
                {
                    name: "Sorbet",
                    resolved: false,
                }
            ]
        },
        {
            name: "Zuby",
            owner: u_id[0],
            memberList: [u_id[2], u_id[3], u_id[4]],
            resolved: true,
            itemList: [
                {
                    name: "Colgate Big Kids´ Smiles zubní pasta 6-9 let",
                    resolved: false,
                },
                {
                    name: "Colgate® Ultra Soft Design Edition Smile Love Repeat",
                    resolved: false,
                }
            ]
        }
    ])
}