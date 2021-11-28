import styled from "@emotion/styled"

export const Container = styled.div`
  max-width: 500px;
  margin: 60px auto;
  padding: 15px;

  background-color: #B1A296;
  border: 1px solid black;
  border-radius: 15px;
`

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 70px;
  color: #501B1D;
`
export const Section = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
`

export const Button = styled.button`
  min-width: 80px;
  padding: 10px 10px;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;

  color: white;
  border: none;
  border-radius: 5px;
  background-color: #6F2232;
  cursor: pointer;

  :not(:last-child) {
  margin-right: 20px;
  }
  :hover {
  transform: scale(1.1);
  }
`