import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { updateProfile } from '../store/slices/authSlice';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [editMode, setEditMode] = useState(false);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  const handleSave = () => {
    dispatch(updateProfile({ name, email }));
    setEditMode(false);
  };

  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      {!editMode ? (
        <div className='profile-field'>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
          </label>
          <button onClick={handleSave} style={{ marginRight: '1rem' }}>
            Save
          </button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
