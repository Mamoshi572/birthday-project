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

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface Roast {
  id: number;
  name: string;
  roast: string;
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
    { id: 1, name: "Ashen", message: "Nisherehe kubwa sana!! Happy birthday to me 🎉", timestamp: new Date() },
    { id: 2, name: "Cleo", message: "Happy birthday mzee! May this year bring you endless code and coffee ☕", timestamp: new Date() },
    { id: 3, name: "Keysha", message: "Another year wiser! Keep building amazing things 🚀", timestamp: new Date() },
  ]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [roasts, setRoasts] = useState<Roast[]>([
    { id: 1, name: "Friend", roast: "At this Age hushajoin sharp boys😂", timestamp: new Date() },
    { id: 2, name: "danny", roast: "Your code works 50% of the time... the other 50% is debugging! 🐛", timestamp: new Date() },
  ]);
  const [newRoast, setNewRoast] = useState({ name: '', roast: '' });
  const [showMpesa, setShowMpesa] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'countdown' | 'wishes' | 'za kabej /uji' | 'roast' | 'fun'>('countdown');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [candlesLit, setCandlesLit] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  
  // Your M-Pesa number
  const mpesaNumber = "254746562072";

  // Personal photos - Replace these with YOUR actual images
  const personalPhotos = [
    "/images/benson/profile.jpg",           // Your main profile photo
    "/images/benson/coding.jpg",            // You coding
    "/images/benson/celebration.jpg",       // You celebrating
    "/images/benson/fun.jpg",               // Casual/fun photo
  ];

  // Birthday quiz
  const quizQuestions: QuizQuestion[] = [
    {
      question: "What's Ashen's birth date?",
      options: ["January 4", "February 4", "March 4", "April 4"],
      answer: 1
    },
    {
      question: "What year was Ashen born?",
      options: ["2000", "2001", "2002", "2003"],
      answer: 2
    },
    {
      question: "What's Ashen's developer nickname?",
      options: ["Ashen", "Benson", "CodeMaster", "Memelord"],
      answer: 3
    },
    {
      question: "What does Ashen love to drink while coding?",
      options: ["Coffee", "Tea", "Soda", "Uji"],
      answer: 0
    }
  ];

  // Gift suggestions
  const giftIdeas = [
    { id: 1, name: "ka uji Treat ☕", amount: "Ksh 50", description: "uji tu iko sawa", emoji: "☕" },
    { id: 2, name: "Lunch 🍕", amount: "Ksh 1000", description: "Avocado iko, buy lunch", emoji: "🍕" },
    { id: 3, name: "ki foren 🪷", amount: "Ksh 100", description: "unajua nacheka kwa nini.....!", emoji: "🪷" },
    { id: 4, name: "Surprise 🎁", amount: "Any", description: "maombi pia iko sawa (Amen)", emoji: "🎁" },
  ];

  // Share options
  const shareOptions = [
    { platform: 'WhatsApp', icon: '💬', color: '#25D366', url: 'https://wa.me/?text=' },
    { platform: 'Twitter', icon: '🐦', color: '#1DA1F2', url: 'https://twitter.com/intent/tweet?text=' },
    { platform: 'Facebook', icon: '👥', color: '#1877F2', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
    { platform: 'Copy Link', icon: '🔗', color: '#667eea', url: 'copy' },
  ];

  // Funny birthday facts about you
  const funnyFacts = [
    "🎮 Can debug code but can't debug why WiFi is slow",
    "☕ Drinks more coffee than water (hydration? what's that?)",
    "😴 Sleep schedule: 'I'll fix it tomorrow'",
    "💾 Has 50+ tabs open 'for research'",
    "🐛 Bugs fixed: Many | New bugs created: Also many",
    "🎵 Codes to lo-fi beats but still writes bugs",
    "📱 Refreshes GitHub 10x a day for green squares",
    "🤔 'It works on my machine' is my motto",
    "🍕 Pizza > Sleep when deadline approaches",
    "🎯 Goals: Become senior dev | Reality: Googling basic syntax"
  ];

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

  const toggleMusic = () => {
    if (musicRef.current) {
      if (musicPlaying) {
        musicRef.current.pause();
      } else {
        musicRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const shareBirthday = (platform: string, url: string) => {
    const text = `🎂 Celebrating Ashen's (Memelord) birthday! Join the celebration and send your wishes:`;
    const currentUrl = window.location.href;
    
    if (platform === 'Copy Link') {
      navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      window.open(`${url}${encodeURIComponent(text + ' ' + currentUrl)}`, '_blank');
    }
  };

  const sendViaWhatsApp = () => {
    const message = `🎉 Happy Birthday Memelord! Wishing you an amazing birthday! 🎂`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
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
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleSubmitRoast = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoast.name.trim() && newRoast.roast.trim()) {
      const roast: Roast = {
        id: roasts.length + 1,
        name: newRoast.name,
        roast: newRoast.roast,
        timestamp: new Date()
      };
      setRoasts([roast, ...roasts]);
      setNewRoast({ name: '', roast: '' });
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
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

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === quizQuestions[currentQuestion].answer) {
      setQuizScore(quizScore + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                  url('/images/benson/background.jpg')`, // Your photo as background
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Overlay for better readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(236, 72, 153, 0.8) 100%)',
        zIndex: 0
      }} />
      
      {/* Background floating elements */}
      <div className="floating-elements">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          >
            {['🎈', '🎂', '🎉', '🎁', '✨', '🥳', '🎊', '🌟', '💫', '❤️'][i % 10]}
          </div>
        ))}
      </div>
      
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
      
      {/* Audio elements */}
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-happy-birthday-horn-576.mp3" />
      <audio ref={musicRef} loop src="https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-443.mp3" />
      
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
            background: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff, #ec4899)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s ease infinite',
            marginBottom: '10px',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)'
          }}>
            {isBirthday ? '🎉 HAPPY BIRTHDAY ASHEN! 🎉' : "Ashen's Birthday"}
          </div>
          
          <div style={{
            fontSize: '1.3rem',
            opacity: 0.95,
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '15px 25px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <span>🎂 Born February 4th</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>👨‍💻 Memelord Developer</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>🎈  Kijan Mdogoo</span>
          </div>
          
          {/* Quick Actions */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
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
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🎉 {isBirthday ? 'Celebrate!' : 'Preview Celebration'}
            </button>
            
            <button
              onClick={toggleMusic}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
              }}
            >
              {musicPlaying ? '⏸️ Pause Music' : '🎵 Play Music'}
            </button>
            
            <button
              onClick={sendViaWhatsApp}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #25D366, #128C7E)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
              }}
            >
              💬 Share on WhatsApp
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50px',
          padding: '10px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {[
            { id: 'countdown', label: '⏱️ Countdown', icon: '⏱️' },
            { id: 'wishes', label: '💬 Birthday Wishes', icon: '💬' },
            { id: 'za kabej /uji', label: '🎁 Send a Gift', icon: '🎁' },
            { id: 'roast', label: '😂 Birthday Roast', icon: '😂' },
            { id: 'fun', label: '🎪 Birthday Fun', icon: '🎪' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id 
                  ? 'rgba(255, 255, 255, 0.25)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '40px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal'
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
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase' }}>
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
                opacity: 0.8,
                textAlign: 'center'
              }}>
                {isBirthday 
                  ? '🎉 Today is the day! Ni mbaya sana!' : `🎂 Next birthday: February 4, ${new Date().getFullYear() + (timeLeft.days > 360 ? 0 : 1)}`
                }
              </div>
            </div>

            {/* Life Stats */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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
        )}

        {activeTab === 'wishes' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)'
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
                    resize: 'vertical',
                    backdropFilter: 'blur(10px)'
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
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ✨ Post Birthday Wish
                </button>
              </div>
            </form>

            {/* Wishes List */}
            <div style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', opacity: 0.9 }}>
                  🎈 Recent Wishes ({wishes.length})
                </h3>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  Share your wishes with Ashen!
                </div>
              </div>
              <div style={{ display: 'grid', gap: '15px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                {wishes.map((wish) => (
                  <div key={wish.id} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    borderLeft: '4px solid #8b5cf6',
                    transition: 'transform 0.3s ease'
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

        {activeTab === 'za kabej /uji' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🎁 Gift Suggestions
            </h2>
            
            <p style={{ marginBottom: '25px', opacity: 0.9, lineHeight: '1.6', fontSize: '1.1rem' }}>
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
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{gift.emoji}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{gift.name}</h3>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    background: 'linear-gradient(45deg, #ffd93d, #ff6b6b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '10px' 
                  }}>
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
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
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
                  marginTop: '15px',
                  animation: 'fadeIn 0.5s ease'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '5px' }}>M-Pesa Number</div>
                      <div style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 'bold', 
                        fontFamily: 'monospace',
                        letterSpacing: '2px',
                        background: 'linear-gradient(45deg, #fff, #ffd93d)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {mpesaNumber}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(mpesaNumber)}
                      style={{
                        padding: '12px 24px',
                        background: copySuccess ? '#10b981' : 'linear-gradient(45deg, #059669, #10b981)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minWidth: '120px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {copySuccess ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px',
                    padding: '15px',
                    background: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 215, 0, 0.3)'
                  }}>
                    <div style={{ fontSize: '1.5rem' }}>💡</div>
                    <div style={{ fontSize: '0.95rem' }}>
                      <strong>Tip:</strong> Open M-Pesa, select "Send Money", enter this number, and any amount you wish!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'roast' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              😂 Birthday Roast Session
            </h2>
            
            <p style={{ marginBottom: '25px', opacity: 0.9, lineHeight: '1.6', fontSize: '1.1rem' }}>
              It's my birthday! Roast me playfully! Share funny jokes, memes, or lighthearted roasts. 
              All in good fun! 🔥
            </p>

            {/* Roast Form */}
            <form onSubmit={handleSubmitRoast} style={{ marginBottom: '30px' }}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={newRoast.name}
                  onChange={(e) => setNewRoast({...newRoast, name: e.target.value})}
                  style={{
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)'
                  }}
                  required
                />
                <textarea
                  placeholder="Your funny roast... (Be playful!)"
                  value={newRoast.roast}
                  onChange={(e) => setNewRoast({...newRoast, roast: e.target.value})}
                  rows={3}
                  style={{
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    resize: 'vertical',
                    backdropFilter: 'blur(10px)'
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    padding: '15px 30px',
                    background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
                    border: 'none',
                    borderRadius: '50px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🔥 Submit Roast
                </button>
              </div>
            </form>

            {/* Funny Facts */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🤣 Ashen's Developer Facts
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '15px'
              }}>
                {funnyFacts.map((fact, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{ fontSize: '1.2rem' }}>😂</div>
                    <div style={{ fontSize: '0.9rem' }}>{fact}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roasts List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', opacity: 0.9 }}>
                  🔥 Recent Roasts ({roasts.length})
                </h3>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  All in good fun! Don't be too harsh 😅
                </div>
              </div>
              <div style={{ display: 'grid', gap: '15px', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                {roasts.map((roast) => (
                  <div key={roast.id} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    borderLeft: '4px solid #f59e0b',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{roast.name}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{formatTimeAgo(roast.timestamp)}</div>
                    </div>
                    <p style={{ margin: 0, opacity: 0.9, lineHeight: '1.5', fontStyle: 'italic' }}>"{roast.roast}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fun' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🎪 Birthday Fun & Games
            </h2>
            
            {/* Interactive Cake */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '25px',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                🎂 Interactive Birthday Game
              </h3>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                {Array.from({ length: age }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCandlesLit(candlesLit === i + 1 ? i : i + 1)}
                    style={{
                      fontSize: '2rem',
                      background: i < candlesLit ? 'linear-gradient(45deg, #ff6b6b, #ffd93d)' : 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {i < candlesLit ? '🕯️' : '🕯'}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                Click to light all {age} candles! {candlesLit === age && '🎉 All candles lit!'}
              </p>
            </div>

            {/* Birthday Quiz */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '25px',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🎯 Birthday Quiz
                </h3>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', background: 'linear-gradient(45deg, #ffd93d, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Score: {quizScore}/{quizQuestions.length}
                </div>
              </div>
              
              {currentQuestion < quizQuestions.length ? (
                <>
                  <div style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: 'bold' }}>
                    {quizQuestions[currentQuestion].question}
                  </div>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        style={{
                          padding: '15px',
                          background: selectedAnswer === index 
                            ? (index === quizQuestions[currentQuestion].answer 
                              ? 'linear-gradient(45deg, #10b981, #059669)' 
                              : 'linear-gradient(45deg, #ef4444, #dc2626)')
                            : 'rgba(255, 255, 255, 0.1)',
                          border: 'none',
                          borderRadius: '10px',
                          color: 'white',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎉</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Quiz Complete!</h3>
                  <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '20px' }}>
                    You scored {quizScore} out of {quizQuestions.length}!
                    {quizScore === quizQuestions.length ? ' Perfect score! 🥳' : ' Great job!'}
                  </p>
                  <button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setQuizScore(0);
                      setSelectedAnswer(null);
                    }}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                      border: 'none',
                      borderRadius: '50px',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>

            {/* Share Everywhere */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '25px'
            }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📱 Share Everywhere
              </h3>
              <p style={{ marginBottom: '20px', opacity: 0.9 }}>
                Share this birthday celebration with friends and family!
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                {shareOptions.map((option) => (
                  <button
                    key={option.platform}
                    onClick={() => shareBirthday(option.platform, option.url)}
                    style={{
                      padding: '15px',
                      background: option.color,
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{option.icon}</span>
                    {option.platform}
                    {option.platform === 'Copy Link' && copySuccess && ' ✓'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.9rem',
          opacity: 0.8,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          marginBottom: '20px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
            Made with ❤️ by Ashen to celebrate amazing years!
          </div>
          <div style={{ marginBottom: '20px', fontSize: '1rem', opacity: 0.9 }}>
            Leo ndio ile siku! 🎉🥳 | Happy Birthday to me!
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a
              href="https://benson-portfolio-flame.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              🚀 View My Portfolio
            </a>
            <a
              href="https://github.com/mamoshi572"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              💻 My GitHub
            </a>
            <button
              onClick={() => window.print()}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '20px',
                color: 'white',
                padding: '8px 16px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🖨️ Save as PDF
            </button>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .floating-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        
        .floating-element {
          position: absolute;
          animation: float 3s ease-in-out infinite;
          opacity: 0.7;
          filter: drop-shadow(0 5px 15px rgba(0,0,0,0.2));
        }
        
        /* Custom scrollbar */
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
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            gridTemplateColumns: repeat(2, 1fr) !important;
          }
          
          div[style*="gridTemplateColumns: repeat(auto-fit, minmax(300px, 1fr))"] {
            gridTemplateColumns: 1fr !important;
          }
          
          header h1 {
            font-size: 2.5rem !important;
          }
          
          .navigation-tabs {
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 10px;
          }
          
          .navigation-tabs button {
            white-space: nowrap;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            gridTemplateColumns: 1fr !important;
          }
          
          header h1 {
            font-size: 2rem !important;
          }
          
          .quick-actions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .quick-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}