import React from 'react'

export default function adminlayout ( {children}: {children: React.ReactNode}  )  {

    return (
        <div>
           <h1> admin  layout </h1>
           {children}
        </div>
    );
}

