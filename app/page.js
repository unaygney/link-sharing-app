import connectDB from "@/config/database";
import HomeContainer from "@/containers/home-container";
import User from "@/models/userModel";
export default async function Home() {
  connectDB();
  let users = await User.find({});
  users = users[0];

  return <HomeContainer users={users} />;
}
