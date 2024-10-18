import React from 'react';
import loading from './loading.gif';

const Spinner = ()=> {
    return (
      <div className='text-center'>
        <img 
          src={loading} 
          alt="loading"
          style={{
            width: '30px',  // Adjust this value to make spinner smaller or larger
            height: '30px', // Keep same as width to maintain aspect ratio
            margin: '10px'  // Add some spacing around the spinner
          }}
        />
      </div>
    );
}
export default Spinner;