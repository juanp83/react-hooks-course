import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import ThemeContext from '../contexts/theme'
import { Link } from 'react-router-dom'

function Instructions () {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3>
          <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
        </li>
      </ol>
    </div>
  )
}

function PlayerInput({ onSubmit, label }) {
  const usernameRef = React.useRef()
  const { theme } = React.useContext(ThemeContext)

  const handleSubmit = (event) => {
    event.preventDefault()

    const username = usernameRef.current.value

    onSubmit(username)
  }

  return (
    <form className='column player' onSubmit={handleSubmit}>
      <label htmlFor='username' className='player-label'>
        {label}
      </label>
      <div className='row player-inputs'>
        <input
          type='text'
          id='username'
          className={`input-${theme}`}
          placeholder='github username'
          autoComplete='off'
          ref={usernameRef}
        />
        <button
          className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
          type='submit'
          disabled={!usernameRef}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a
            href={`https://github.com/${username}`}
            className='link'>
              {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function playerReducer(state, action) {
  if (action.type === 'playerOne') {
    return {
      ...state,
      playerOne: action.player
    }
  }
  if (action.type === 'playerTwo') {
    return {
      ...state,
      playerTwo: action.player
    }
  }
  if (action.type === 'reset') {
    return {
      ...state,
      [action.player]: null
    }
  }
  else {
    throw new Error(`This action type isn't supported.`)
  }
}

export default function Battle() {
  const [state, dispatch] = React.useReducer(
    playerReducer,
    {
      playerOne: null,
      playerTwo: null
    }
  )

  return (
    <React.Fragment>
      <Instructions />

      <div className='players-container'>
        <h1 className='center-text header-lg'>Players</h1>
        <div className='row space-around'>
          {state.playerOne === null
            ? <PlayerInput
                label='Player One'
                onSubmit={(player) => dispatch({ type: 'playerOne', player })}
              />
            : <PlayerPreview
                username={state.playerOne}
                label='Player One'
                onReset={() => dispatch({ type: 'reset', player: 'playerOne' })}
              />
          }

          {state.playerTwo === null
            ? <PlayerInput
                label='Player Two'
                onSubmit={(player) => dispatch({type: 'playerTwo', player })}
              />
            : <PlayerPreview
                username={state.playerTwo}
                label='Player Two'
                onReset={() => dispatch({ type: 'reset', player: 'playerTwo' })}
              />
          }
        </div>


        {state.playerOne && state.playerTwo && (
          <Link
            className='btn dark-btn btn-space'
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${state.playerOne}&playerTwo=${state.playerTwo}`
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  )
}
