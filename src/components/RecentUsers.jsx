export default function RecentUsers({ users }) {
  return (
    <div className="bg-gray-200 p-2 rounded-lg w-full max-w-[700px]">
      <h1 className="text-2xl font-bold">Recent Users: </h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Profile Picture</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(-5).reverse().map((user, index) => (
            <tr key={index}>
              <td className="flex justify-center items-center px-4 py-2">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                  }
                  alt={`Profile of ${user.firstName} ${user.lastName}`}
                />
              </td>
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
