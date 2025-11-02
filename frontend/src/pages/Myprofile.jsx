import React, { useState, useEffect } from "react";

const MyProfile = () => {
  // ✅ multiple data sets for addresses
  const [profiles, setProfiles] = useState([]);

  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // ✅ load from localStorage when page loads
  useEffect(() => {
    const saved = localStorage.getItem("userProfiles");
    if (saved) {
      setProfiles(JSON.parse(saved));
      setIsEditing(false);
      setIsSaved(true);
    } else {
      // Start with one empty profile
      setProfiles([
        {
          id: Date.now(),
          title: "Address 1",
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          pincode: "",
          country: "",
        },
      ]);
    }
  }, []);

  // ✅ handle input changes
  const handleChange = (id, e) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [e.target.name]: e.target.value } : p
      )
    );
  };

  // ✅ save all data to localStorage
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfiles", JSON.stringify(profiles));
    setIsEditing(false);
    setIsSaved(true);
  };

  // ✅ enable editing mode again
  const handleEdit = () => {
    setIsEditing(true);
    setIsSaved(false);
  };

  // ✅ add another address set
  const handleAddProfile = () => {
    const newProfile = {
      id: Date.now(),
      title: `Address ${profiles.length + 1}`,
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
    };
    setProfiles((prev) => [...prev, newProfile]);
    setIsEditing(true);
    setIsSaved(false);
  };

  // ✅ remove one address set
  const handleRemoveProfile = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white p-6 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        My Profile Information
      </h2>

      <form onSubmit={handleSave} className="space-y-8">
        {profiles.map((profile) => (
          <div key={profile.id} className="border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {profile.title}
              </h3>
              {profiles.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProfile(profile.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  ✕ Remove
                </button>
              )}
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["name", "Full Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["address", "Address"],
                ["city", "City"],
                ["pincode", "Pincode"],
                ["country", "Country"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-gray-600 mb-1">{label}</label>
                  {field === "address" ? (
                    <textarea
                      name={field}
                      value={profile[field]}
                      onChange={(e) => handleChange(profile.id, e)}
                      disabled={!isEditing}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className={`w-full border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "border-blue-400 focus:outline-blue-500"
                          : "bg-gray-100"
                      }`}
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={profile[field]}
                      onChange={(e) => handleChange(profile.id, e)}
                      disabled={!isEditing}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className={`w-full border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "border-blue-400 focus:outline-blue-500"
                          : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-wrap justify-between items-center mt-6 gap-3">
          <button
            type="button"
            onClick={handleAddProfile}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            + Add Another Address
          </button>

          {isEditing ? (
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save All
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Update Information
            </button>
          )}
        </div>
      </form>

      {isSaved && (
        <p className="text-green-600 text-center mt-5 font-medium">
          ✅ All customer information saved successfully!
        </p>
      )}
    </div>
  );
};

export default MyProfile;
