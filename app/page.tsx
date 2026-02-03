"use client";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import confetti
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

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
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, name: "You", message: "Nisherehe kubwa sana!! Happy birthday to me 🎉", timestamp: new Date() },
    { id: 2, name: "Well-wisher", message: "Happy birthday we mzee..", timestamp: new Date() },
  ]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [showMpesa, setShowMpesa] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'countdown' | 'wishes' | 'gifts'>('countdown');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Your M-Pesa number (Update this with your actual number)
  const mpesaNumber = "254746562072"; // Replace with your number

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    const calculateMetrics = () => {
      const now = new Date();
      const birthDate = new Date(2002, 1, 4);
      
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
      const isTodayBirthday = now.getMonth() === 1 && now.getDate() === 4;
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
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const playBirthdaySound = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const shareOnTwitter = () => {
    const text = `🎂 Celebrating my ${age}th birthday! Send me wishes and check out my interactive birthday page:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWish.name.trim() && newWish.message.trim()) {
      const wish: Wish = {
        id: wishes.length + 1,
        name: newWish.name,
        message: newWish.message,
        timestamp: new Date()
      };
      setWishes([wish, ...wishes]);
      setNewWish({ name: '', message: '' });
      
      // Show confetti for new wishes
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  // Gift suggestions
  const giftIdeas = [
    { id: 1, name: "ka uji Treat ☕", amount: "Ksh 50", description: "uji tu iko sawa" },
    { id: 2, name: "Lunch 🍕", amount: "ksh 1000", description: "Avocado iko, buy lunch" },
    { id: 3, name: "ki foren 🪷", amount: "ksh 100", description: "unajua nacheka kwa nini.....!" },
    { id: 4, name: "Surprise 🎁", amount: "Any", description: "maombi pia iko sawa (Amen)" },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%)',
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
      {showConfetti && windowSize.width > 0 && windowSize.height > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      
      {/* Audio */}
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
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: isBirthday ? '4.5rem' : '3.5rem',
            fontWeight: 900,
            background: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s ease infinite',
            marginBottom: '10px'
          }}>
            {isBirthday ? '🎉 HAPPY BIRTHDAY BENSON! 🎉' : "Benson's Birthday"}
          </div>
          
          <div style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <span>🎂 Born February 4th</span>
            <span>•</span>
            <span>👨‍💻 Developer</span>
            <span>•</span>
            <span>🎈 Kijana mdogooo</span>
          </div>
          
          <button
            onClick={playBirthdaySound}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🎉 {isBirthday ? 'Celebrate My Birthday!' : 'Preview Celebration'}
          </button>
        </header>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'countdown', label: '⏱️ Countdown', icon: '⏱️' },
            { id: 'wishes', label: '💬 Birthday Wishes', icon: '💬' },
            { id: 'za kabej /uji', label: '🎁 Send a Gift', icon: '🎁' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        {activeTab === 'countdown' && (
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
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase' }}>
                      {unit}
                    </div>
                  </div>
                ))}
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
                ].map((stat) => (
                  <div key={stat.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px'
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
                      <span>{stat.label}</span>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wishes' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '30px'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              💬 Send Birthday Wishes
            </h2>
            
            {/* Wish Form */}
            <form onSubmit={handleSubmitWish} style={{ marginBottom: '30px' }}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={newWish.name}
                  onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                  style={{
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  required
                />
                <textarea
                  placeholder="Your birthday message..."
                  value={newWish.message}
                  onChange={(e) => setNewWish({...newWish, message: e.target.value})}
                  rows={4}
                  style={{
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  required
                />
                <button
                  type="submit"
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
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  ✨ Post Birthday Wish
                </button>
              </div>
            </form>

            {/* Wishes List */}
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', opacity: 0.9 }}>
                🎈 Recent Wishes ({wishes.length})
              </h3>
              <div style={{ display: 'grid', gap: '15px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                {wishes.map((wish) => (
                  <div key={wish.id} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    borderLeft: '4px solid #8b5cf6'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{wish.name}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{formatTimeAgo(wish.timestamp)}</div>
                    </div>
                    <p style={{ margin: 0, opacity: 0.9, lineHeight: '1.5' }}>{wish.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gifts' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '30px'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🎁 Gift Suggestions
            </h2>
            
            <p style={{ marginBottom: '25px', opacity: 0.9, lineHeight: '1.6' }}>
              If you'd like to make my birthday extra special, here are some gift ideas. 
              Every little bit means a lot ata salamu! 💝
            </p>

            {/* Gift Ideas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {giftIdeas.map((gift) => (
                <div key={gift.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '25px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{gift.name.split(' ')[1]}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{gift.name}</h3>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffd93d', marginBottom: '10px' }}>
                    {gift.amount}
                  </div>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>{gift.description}</p>
                </div>
              ))}
            </div>

            {/* M-Pesa Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '25px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  📱 Send via M-Pesa (Kenya)
                </h3>
                <button
                  onClick={() => setShowMpesa(!showMpesa)}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '20px',
                    color: 'white',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  {showMpesa ? 'Hide' : 'Show'} Number
                </button>
              </div>
              
              {showMpesa && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '15px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '5px' }}>M-Pesa Number</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                        {mpesaNumber}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(mpesaNumber)}
                      style={{
                        padding: '10px 20px',
                        background: copySuccess ? '#10b981' : 'linear-gradient(45deg, #059669, #10b981)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minWidth: '100px'
                      }}
                    >
                      {copySuccess ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '12px',
                    background: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 215, 0, 0.3)'
                  }}>
                    <div style={{ fontSize: '1.2rem' }}>💡</div>
                    <div style={{ fontSize: '0.9rem' }}>
                      <strong>Tip:</strong> Open M-Pesa, select "Send Money", enter this number, and any amount you wish!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Options */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                💝 Other Ways to Celebrate
              </h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
                  <span>📧</span>
                  <span>Send an email with your favorite memory of us</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
                  <span>🌟</span>
                  <span>Share this page with others to spread the celebration</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
                  <span>🎯</span>
                  <span>Challenge me to a coding problem or game</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={shareOnTwitter}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #1da1f2, #0d8bdc)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '180px'
            }}
          >
            🐦 Share on Twitter
          </button>
          
          <a
            href="https://benson-portfolio-flame.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              minWidth: '180px'
            }}
          >
            🚀 View My Portfolio
          </a>
          
          <button
            onClick={() => window.print()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '180px'
            }}
          >
            🖨️ Save as PDF
          </button>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '30px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.9rem',
          opacity: 0.7
        }}>
          <div style={{ marginBottom: '10px' }}>
            Made with ❤️ by Benson to celebrate amazing years!
          </div>
          <div>
            Leo ndio ile siku! 🎉🥳

          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Custom scrollbar for wishes */
        div::-webkit-scrollbar {
          width: 8px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            gridTemplateColumns: repeat(2, 1fr) !important;
          }
          
          div[style*="gridTemplateColumns: repeat(auto-fit, minmax(300px, 1fr))"] {
            gridTemplateColumns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            gridTemplateColumns: 1fr !important;
          }
          
          header h1 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}