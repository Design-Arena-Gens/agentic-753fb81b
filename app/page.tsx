'use client'

import { useState, useEffect } from 'react'

interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeRecord: string
  awayRecord: string
  gameTime: string
  gameDate: string
  venue: string
  network: string
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating NFL games data for the current week
    const generateGames = () => {
      const nflTeams = [
        { name: 'Kansas City Chiefs', record: '6-1', abbr: 'KC' },
        { name: 'Buffalo Bills', record: '6-2', abbr: 'BUF' },
        { name: 'San Francisco 49ers', record: '5-3', abbr: 'SF' },
        { name: 'Philadelphia Eagles', record: '7-1', abbr: 'PHI' },
        { name: 'Dallas Cowboys', record: '5-2', abbr: 'DAL' },
        { name: 'Miami Dolphins', record: '6-2', abbr: 'MIA' },
        { name: 'Baltimore Ravens', record: '6-2', abbr: 'BAL' },
        { name: 'Detroit Lions', record: '6-2', abbr: 'DET' },
        { name: 'Jacksonville Jaguars', record: '6-2', abbr: 'JAX' },
        { name: 'Cincinnati Bengals', record: '5-3', abbr: 'CIN' },
        { name: 'Cleveland Browns', record: '5-2', abbr: 'CLE' },
        { name: 'Seattle Seahawks', record: '5-2', abbr: 'SEA' },
        { name: 'Los Angeles Rams', record: '4-4', abbr: 'LAR' },
        { name: 'New Orleans Saints', record: '5-3', abbr: 'NO' },
        { name: 'Green Bay Packers', record: '4-4', abbr: 'GB' },
        { name: 'Tampa Bay Buccaneers', record: '4-4', abbr: 'TB' }
      ]

      const venues = [
        'Arrowhead Stadium',
        'Highmark Stadium',
        "Levi's Stadium",
        'Lincoln Financial Field',
        'AT&T Stadium',
        'Hard Rock Stadium',
        'M&T Bank Stadium',
        'Ford Field',
        'TIAA Bank Field',
        'Paycor Stadium',
        'Cleveland Browns Stadium',
        'Lumen Field',
        'SoFi Stadium',
        'Caesars Superdome',
        'Lambeau Field',
        'Raymond James Stadium'
      ]

      const networks = ['CBS', 'FOX', 'NBC', 'ESPN', 'Amazon Prime']

      const weekDays = [
        { day: 'Thursday', date: 'October 17, 2025', time: '8:15 PM ET' },
        { day: 'Sunday', date: 'October 20, 2025', time: '1:00 PM ET' },
        { day: 'Sunday', date: 'October 20, 2025', time: '1:00 PM ET' },
        { day: 'Sunday', date: 'October 20, 2025', time: '4:05 PM ET' },
        { day: 'Sunday', date: 'October 20, 2025', time: '4:25 PM ET' },
        { day: 'Sunday', date: 'October 20, 2025', time: '8:20 PM ET' },
        { day: 'Monday', date: 'October 21, 2025', time: '8:15 PM ET' }
      ]

      const generatedGames: Game[] = []
      const usedTeams = new Set<number>()

      for (let i = 0; i < 7; i++) {
        let awayIdx, homeIdx

        do {
          awayIdx = Math.floor(Math.random() * nflTeams.length)
        } while (usedTeams.has(awayIdx))
        usedTeams.add(awayIdx)

        do {
          homeIdx = Math.floor(Math.random() * nflTeams.length)
        } while (usedTeams.has(homeIdx) || homeIdx === awayIdx)
        usedTeams.add(homeIdx)

        const away = nflTeams[awayIdx]
        const home = nflTeams[homeIdx]

        generatedGames.push({
          id: `game-${i}`,
          awayTeam: away.name,
          homeTeam: home.name,
          awayRecord: away.record,
          homeRecord: home.record,
          gameTime: weekDays[i].time,
          gameDate: weekDays[i].date,
          venue: venues[homeIdx],
          network: networks[Math.floor(Math.random() * networks.length)]
        })
      }

      return generatedGames.sort((a, b) => {
        const dateA = new Date(a.gameDate + ' ' + a.gameTime)
        const dateB = new Date(b.gameDate + ' ' + b.gameTime)
        return dateA.getTime() - dateB.getTime()
      })
    }

    setTimeout(() => {
      setGames(generateGames())
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="container">
        <header className="header">
          <h1>🏈 NFL Games This Week</h1>
          <p>Week 7 Schedule</p>
        </header>
        <div className="loading">Loading games...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🏈 NFL Games This Week</h1>
        <p>Week 7 Schedule - October 17-21, 2025</p>
      </header>

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-time">
              <div className="game-date">{game.gameDate}</div>
              <div className="game-time-text">{game.gameTime}</div>
            </div>

            <div className="matchup">
              <div className="team">
                <div className="team-info">
                  <div className="team-logo">{game.awayTeam.split(' ').pop()?.substring(0, 3).toUpperCase()}</div>
                  <div>
                    <div className="team-name">{game.awayTeam}</div>
                    <div className="team-record">{game.awayRecord}</div>
                  </div>
                </div>
              </div>

              <div className="vs">@</div>

              <div className="team">
                <div className="team-info">
                  <div className="team-logo">{game.homeTeam.split(' ').pop()?.substring(0, 3).toUpperCase()}</div>
                  <div>
                    <div className="team-name">{game.homeTeam}</div>
                    <div className="team-record">{game.homeRecord}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="game-venue">
              📍 {game.venue} • 📺 {game.network}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
