const Form = () => {
  return <form>
      <input type="text" name="username" placeholder="Enter Player One"/>
      <br/>
      <input type="text" name="username" placeholder="Enter Player Two"/>
      <br/>
      <button type="submit" className="btn">START GAME</button>
  </form>
}

export default Form;