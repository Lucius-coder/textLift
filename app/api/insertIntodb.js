import connectToDb from "@/database/connection.js";
import userModel from "@/database/models/user.js";

export default async function insertIntoDatabase(name, email) {
  let user;
  try {
    await connectToDb();
    const userExists = await userModel.findOne({ email: email });
    if (!userExists) {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      if (res.ok) {
        user = await res.json(); // Ensure you handle the response correctly
        console.log('User successfully created:', user);
      } else {
        console.error('Failed to create user:', res.status, await res.text());
      }
    } else {
      console.log('User already exists:', userExists);
      user = userExists;
    }
  } catch (error) {
    console.error('Error inserting into database:', error);
  }

  return user;
}
