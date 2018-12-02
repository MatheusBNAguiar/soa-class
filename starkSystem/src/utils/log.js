require('colors')

module.exports = (type, message, origin) => {
  const date = new Date().toLocaleDateString(
    'pt-BR',
    {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Sao_Paulo'
    }
  )
  const computedMessage = `[${date}][${origin}] ${message}`
  switch (type) {
    case 'info':
      console.log(`[I]${computedMessage}`.blue)
      break
    case 'warning':
      console.log(`[W]${computedMessage}`.yellow)
      break
    case 'success':
      console.log(`[S]${computedMessage}`.green)
      break
    case 'error':
      console.log(`[E]${computedMessage}`.red)
      break
  }
}
