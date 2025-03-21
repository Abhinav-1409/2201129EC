export default function UserCard({ user, rank }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-indigo-100 rounded-full h-14 w-14 flex items-center justify-center text-indigo-600 font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              {rank <= 3 && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                  #{rank}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-indigo-500">📝</span>
              <span className="text-gray-700 font-medium">{user.postCount} posts</span>
            </div>
            <span className="text-sm text-gray-500">Active User</span>
          </div>
        </div>
      </div>
    );
  }