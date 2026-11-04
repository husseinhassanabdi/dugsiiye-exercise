// type Props = { params: { slug: string } };

// export default function blogPage({ params }: Props) {
//   return <h1>You visited {params.slug}</h1>;
// }

import React from 'react'

interface blogProps {
  params : {
    slug : string[]
  }
}

export const blog  = ({params}: blogProps ) => {
  return (
    <div> You visited {params.slug.join('/') } </div>
  ) 
}

export default blog; 

