import React from 'react'
import SmallViewItem from './SmallViewItem'
import Heading from './Heading'

function SomethingNew() {
    return (
        <>
          <Heading heading={"What's New"}/>
          <div className='px-4 -mt-2'>
            <section className="flex noscroll overflow-x-auto space-x-4 p-4">
              <SmallViewItem/>
              <SmallViewItem/>
              <SmallViewItem/>
              <SmallViewItem/>
              <SmallViewItem/>
              <SmallViewItem/>
              <SmallViewItem/>
    
            </section>
          </div>
        </>
      )
}

export default SomethingNew