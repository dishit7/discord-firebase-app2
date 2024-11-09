'use client';
import { useState, useEffect } from 'react';
import { database, onValue, ref, set } from './firebase';


export default function Toggle() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const toggleRef = ref(database, 'toggle');
    onValue(toggleRef, (snapshot) => {
      const value = snapshot.val();
      setToggle(value);
    });
  }, []);

  const handleToggle = () => {
    const toggleRef = ref(database, 'toggle');
    set(toggleRef, !toggle);
  };

  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
      <button onClick={handleToggle} className='bg-white p-2 text-black'>
        Toggle Field: {toggle ? 'True' : 'False'}
      </button>
    </div>
  );
}
