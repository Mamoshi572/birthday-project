"use client";

import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });
  
  const [age, setAge] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isBirthday, setIsBirthday] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quote, setQuote] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Birthday quotes
  const birthdayQuotes = [
    "The more you praise and celebrate your life, the more there is in life to celebrate.",
    "Today you are you! That is truer than true! There is no one alive who is you-er than you!",
    "Count your age by friends, not years. Count your life by smiles, not tears.",
    "The secret of staying young is to live honestly, eat slowly, and lie about your age.",
    "Birthdays are nature's way of telling us to eat more cake.",
    "Growing old is mandatory; growing up is optional.",
    "You're not getting older, you're getting better!",
    "Today is the oldest you've ever been, and the youngest you'll ever be again."
  ];

  useEffect(() => {
    const calculateMetrics = () => {
      const now = new Date();
      const birthDate = new Date(2002, 1, 4); // Feb 4, 2002
      
      // Calculate age
      const currentAge = now.getFullYear() - birthDate.getFullYear();
      if (now.getMonth() < birthDate.getMonth() || 
          (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())) {
        setAge(currentAge - 1);
      } else {
        setAge(currentAge);
      }
      
      // Calculate total seconds lived
      const secondsLived = Math.floor((now.getTime() - birthDate.getTime()) / 1000);
      setTotalSeconds(secondsLived);
      
      // Check if today is birthday
      const isTodayBirthday = now.getMonth() === 1 && now.getDate() === 4; // Feb 4
      setIsBirthday(isTodayBirthday);
      
      // Calculate time to next birthday
      const nextBirthday = new Date(now.getFullYear(), 1, 4);
      if (nextBirthday < now) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }
      
      const diff = nextBirthday.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };
    
    calculateMetrics();
    const interval = setInterval(calculateMetrics, 1000);
    
    // Set random quote
    setQuote(birthdayQuotes[Math.floor(Math.random() * birthdayQuotes.length)]);
    
    return () => clearInterval(interval);
  }, []);

  const playBirthdaySound = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const shareOnTwitter = () => {
    const text = `🎂 Celebrating my birthday! I'm ${age} years young today! Check out my interactive birthday countdown:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        opacity: 0.1
      }} />
      
      {/* Confetti */}
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </div>
      )}
      
      {/* Audio element for birthday sound */}
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-happy-birthday-horn-576.mp3" />
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          padding: '40px 20px',
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: isBirthday ? '4.5rem' : '3.5rem',
            fontWeight: 900,
            background: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s ease infinite',
            marginBottom: '20px'
          }}>
            {isBirthday ? '🎉 HAPPY BIRTHDAY BENSON! 🎉' : "Benson's Birthday Celebration"}
          </div>
          
          <div style={{
            fontSize: '1.3rem',
            opacity: 0.9,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <span>🎂 Born February 4, 2002</span>
            <span>•</span>
            <span>👨‍💻 Developer</span>
            <span>•</span>
            <span>🎈 {age} Years Young</span>
          </div>
          
          {isBirthday && (
            <button
              onClick={playBirthdaySound}
              style={{
                marginTop: '20px',
                padding: '15px 30px',
                background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                margin: '20px auto'
              }}
            >
              🎵 Play Birthday Music & Confetti!
            </button>
          )}
        </header>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {/* Countdown Timer */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              ⏱️ {isBirthday ? 'Enjoy Your Special Day!' : 'Countdown to Next Birthday'}
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px',
              marginBottom: '25px'
            }}>
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '16px',
                  padding: '25px 15px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {unit}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '15px',
              fontSize: '0.9rem',
              opacity: 0.8
            }}>
              {isBirthday 
                ? '🎉 Today is the day! Celebrate and enjoy every moment!'
                : `🎂 Next birthday: February 4, ${new Date().getFullYear() + (timeLeft.days > 360 ? 0 : 1)}`
              }
            </div>
          </div>

          {/* Life Stats */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📊 Life Statistics
            </h2>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {[
                { label: 'Years Alive', value: age, emoji: '🎂', color: '#ff6b6b' },
                { label: 'Days Alive', value: Math.floor(totalSeconds / 86400).toLocaleString(), emoji: '📅', color: '#4d96ff' },
                { label: 'Hours Alive', value: Math.floor(totalSeconds / 3600).toLocaleString(), emoji: '⏰', color: '#6bcf7f' },
                { label: 'Minutes Alive', value: Math.floor(totalSeconds / 60).toLocaleString(), emoji: '⏱️', color: '#ffd93d' },
                { label: 'Seconds Alive', value: totalSeconds.toLocaleString(), emoji: '⚡', color: '#9d4edd' },
              ].map((stat, index) => (
                <div key={stat.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {stat.emoji}
                    </div>
                    <span style={{ fontSize: '1rem' }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '30px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '15px', opacity: 0.9 }}>
            "{quote}"
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>
            - Birthday Wisdom
          </div>
        </div>

        {/* Developer Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '30px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            👨‍💻 About This Project
          </h2>
          
          <div style={{ marginBottom: '25px', lineHeight: '1.6' }}>
            <p>Hi, I'm Benson (Ashen)! I built this interactive birthday celebration as a developer project for my portfolio.</p>
            <p>This app tracks time in various units, celebrates milestones, and showcases what I can build as a developer.</p>
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '25px'
          }}>
            {['JavaScript', 'React', 'Next.js', 'CSS3', 'Vercel', 'Responsive Design'].map((tech) => (
              <span key={tech} style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={shareOnTwitter}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(45deg, #1da1f2, #0d8bdc)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minWidth: '200px'
            }}
          >
            🐦 Share on Twitter
          </button>
          
          <a
            href="https://benson-portfolio-flame.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              minWidth: '200px'
            }}
          >
            🚀 View My Portfolio
          </a>
          
          <button
            onClick={() => window.print()}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(45deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minWidth: '200px'
            }}
          >
            🖨️ Save as PDF
          </button>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '1.1rem', marginBottom: '10px', opacity: 0.9 }}>
            Made with ❤️ to celebrate {age} amazing years!
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '20px' }}>
            Deployed on Vercel • Perfect for portfolio showcase • Live updating every second
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <a 
              href="https://vercel.com/new" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ opacity: 0.8, textDecoration: 'none', color: 'white' }}
            >
              Deploy your own →
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ opacity: 0.8, textDecoration: 'none', color: 'white' }}
            >
              View on GitHub →
            </a>
            <a 
              href="mailto:hello@example.com" 
              style={{ opacity: 0.8, textDecoration: 'none', color: 'white' }}
            >
              Contact Me →
            </a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            gridTemplateColumns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            gridTemplateColumns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}