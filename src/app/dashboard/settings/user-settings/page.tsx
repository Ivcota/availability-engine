import SettingsForm from "./settings-form";
import { getUserFromSession } from "~/server/actions/user-actions";

const UserSettingsPage = async () => {
  const user = await getUserFromSession();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">User Settings</h1>
      <SettingsForm user={user} />
    </div>
  );
};

export default UserSettingsPage;
