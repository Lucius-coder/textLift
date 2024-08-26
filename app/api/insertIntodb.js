export default async function insertIntoDatabase(){
    const { name, email } = user;
    try {
      await connectToDb();
      const userExists = await userModel.findOne({ email });

      if (!userExists) {
        const res = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        });

        if (res.ok) {
          return user;
        }
      }
    } catch (error) {
      console.log(error);
    }
  

  return user;
}
