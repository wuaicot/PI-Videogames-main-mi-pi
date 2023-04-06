import { useNavigate } from 'react-router-dom'
import { ComponentContainer, Container } from './StylesLandingPage'

export const LandingPage = () => {

  const navigate = useNavigate()

  return (
    <ComponentContainer>
      <Container>
        <div className='centerContainer'>
          <div className='subtitleContainer'>
            <h3>Bien venido a la app!</h3>
          </div>
          <div className='buttonContainer'>
            <button onClick={() => navigate('/home')}>Entrar</button>
          </div>
        </div>
      </Container>
    </ComponentContainer>
  )
}