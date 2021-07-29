import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default function Loading({ speed, text }) {
  const [ content, setContent ] = React.useState(text)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      content === text + '...'
        ? setContent(text)
        : setContent((content) => content + '.')
    }, speed)

    return () => window.clearInterval(id)

  }, [speed, text])

  return (
    <p style={styles.content}>
      {content}
    </p>
  )
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
