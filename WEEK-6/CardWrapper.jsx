

// export const App = () => {
//   <CardWrapper innerComponent={TextComponent}/>
// }

// function TextComponent(){
//   return(
//     <div>Hi There</div>
//   )
// }

// function CardWrapper({innerComponent}){
//   return(
//     <div style={{border: "1px solid black"}}>
//       {innerComponent()}
//     </div>
//   )
// }


//------------

// We dont usually use wrapper like in the above case. Also mind that what is a wrapper, in this case it is the CardWrapper which takes all the cards and renders it. Basically we are passing cards as a component to the CardWrapper and it is rendering it.


export const App = () => {
  <CardWrapper>
    Hi there
  </CardWrapper>
}


function CardWrapper({children}){
  return(
    <div style={{border: "1px solid black"}}>
      {children}
    </div>
  )
}

//Now in this case the children can be anything from a text to a div to a whole component