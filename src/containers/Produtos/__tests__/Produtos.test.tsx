import { rest } from 'msw'
import { setupServer} from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

import Produtos from ".."
import { renderizaComProvider } from "../../../utils/testes"

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'ps5', 'Nintendo'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Fifa'
  },
  {
    id:3 ,
    categoria: 'corrida',
    imagem: '',
    plataformas: ['Windows', 'ps5'],
    preco: 160.9,
    precoAntigo: 199.9,
    titulo: 'Iracing'
  },
  {
    id: 4,
    categoria: 'tiro',
    imagem: '',
    plataformas: ['Windows', 'xbox'],
    preco: 120.9,
    precoAntigo: 200.9,
    titulo: 'Bf'
  }
]

const server = setupServer(
  rest.get('http://localhost:4000/proutos' , (requisicao, resposta, contexto) => {
    return resposta(contexto.json(mocks))
  })
)



describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())


  test('Deve renderizar corretamente com o texto de carregamento' , () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos' , async () => {
    const {debug} =renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Fifa')).toBeInTheDocument()
    })
  })
})


