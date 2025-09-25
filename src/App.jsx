import React, { useState, useEffect } from 'react';

const WorldClock = function () {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [customCities, setCustomCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearched, setLastSearched] = useState('');

  const timezones = [
    { name: 'Bakı, Azərbaycan', timezone: 'Asia/Baku', code: 'AZ' },
    { name: 'İstanbul, Türkiyə', timezone: 'Europe/Istanbul', code: 'TR' },
    { name: 'Moskva, Rusiya', timezone: 'Europe/Moscow', code: 'RU' },
    { name: 'London, Böyük Britaniya', timezone: 'Europe/London', code: 'GB' },
    { name: 'Paris, Fransa', timezone: 'Europe/Paris', code: 'FR' },
    { name: 'Berlin, Almaniya', timezone: 'Europe/Berlin', code: 'DE' },
    { name: 'New York, ABŞ', timezone: 'America/New_York', code: 'US' },
    { timezone: 'Europe/Amsterdam', code: 'NL', name: 'Amsterdam, Holland' }
  ];

  useEffect(function () {
    const timer = setInterval(function () {
      setCurrentTime(new Date());
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  }, []);

  function getTimeForTimezone(timezone) {
    try {
      const now = new Date();
      const options = {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      };

      const dateTimeString = now.toLocaleString('az-AZ', options);
      return dateTimeString;
    } catch (error) {
      console.error('Xəta baş verdi:', error, 'Timezone:', timezone);
      const now = new Date();
      return now.toLocaleString('az-AZ');
    }
  }

  function getTimeOfDay(timezone) {
    try {
      const now = new Date();
      const options = {
        timeZone: timezone,
        hour12: false,
        hour: 'numeric'
      };

      const hourString = now.toLocaleString('az-AZ', options);
      const hour = parseInt(hourString);

      if (hour >= 6 && hour < 12) return 'Səhər';
      if (hour >= 12 && hour < 18) return 'Gündüz';
      if (hour >= 18 && hour < 22) return 'Axşam';
      return 'Gecə';
    } catch (error) {
      return 'Gündüz';
    }
  }

  function getTimezoneOffsetNumber(timezone) {
    const offsets = {
      'Asia/Baku': 4,
      'Europe/Istanbul': 3,
      'Europe/Moscow': 3,
      'Europe/London': 1,
      'Europe/Paris': 2,
      'Europe/Berlin': 2,
      'America/New_York': -4,
      'America/Los_Angeles': -7,
      'Asia/Tokyo': 9,
      'Asia/Shanghai': 8,
      'Asia/Kolkata': 5.5,
      'Asia/Dubai': 4,
      'Africa/Cairo': 2,
      'Australia/Sydney': 10,
      'America/Sao_Paulo': -3,
      'America/Mexico_City': -5,
      'Asia/Seoul': 9,
      'Asia/Bangkok': 7,
      'Asia/Singapore': 8,
      'America/Toronto': -4,
      'Asia/Tehran': 3.5,
      'Asia/Riyadh': 3,
      'Europe/Kiev': 3,
      'Europe/Rome': 2,
      'Europe/Madrid': 2,
      'America/Caracas': -4,
      'Africa/Lagos': 1,
      'Europe/Amsterdam': 2,
      'Europe/Prague': 2,
      'Europe/Vienna': 2,
      'Europe/Budapest': 2,
      'Europe/Warsaw': 2,
      'Europe/Lisbon': 1,
      'Europe/Athens': 3,
      'Europe/Helsinki': 3,
      'Europe/Oslo': 2,
      'Europe/Stockholm': 2,
      'Europe/Copenhagen': 2,
      'Europe/Dublin': 1,
      'Europe/Brussels': 2,
      'Europe/Zurich': 2,
      'Africa/Johannesburg': 2,
      'Africa/Nairobi': 3,
      'America/Argentina/Buenos_Aires': -3,
      'America/Santiago': -4,
      'America/Lima': -5,
      'America/Bogota': -5,
      'Asia/Hong_Kong': 8,
      'Asia/Taipei': 8,
      'Asia/Jakarta': 7,
      'Asia/Kuala_Lumpur': 8,
      'Asia/Manila': 8,
      'Asia/Jerusalem': 3,
      'Pacific/Auckland': 12,
      'Australia/Melbourne': 10,
      'Australia/Perth': 8
    };

    return offsets[timezone] || 0;
  }

  const addCustomCity = function (cityName) {
    if (!cityName.trim()) return;

    const lowerCityName = cityName.toLowerCase().trim();
    const alreadyExists = [...timezones, ...customCities].some(tz =>
      tz.name.toLowerCase().includes(lowerCityName)
    );

    if (alreadyExists) return;

    setIsLoading(true);

    const cityTimezones = {
      'ankara': { timezone: 'Europe/Istanbul', code: 'TR', name: 'Ankara, Türkiyə' },
      'prague': { timezone: 'Europe/Prague', code: 'CZ', name: 'Prague, Çexiya' },
      'vienna': { timezone: 'Europe/Vienna', code: 'AT', name: 'Vienna, Avstriya' },
      'budapest': { timezone: 'Europe/Budapest', code: 'HU', name: 'Budapest, Macarıstan' },
      'warsaw': { timezone: 'Europe/Warsaw', code: 'PL', name: 'Warsaw, Polşa' },
      'lisbon': { timezone: 'Europe/Lisbon', code: 'PT', name: 'Lisbon, Portuqaliya' },
      'athens': { timezone: 'Europe/Athens', code: 'GR', name: 'Athens, Yunanıstan' },
      'helsinki': { timezone: 'Europe/Helsinki', code: 'FI', name: 'Helsinki, Finlandiya' },
      'oslo': { timezone: 'Europe/Oslo', code: 'NO', name: 'Oslo, Norveç' },
      'stockholm': { timezone: 'Europe/Stockholm', code: 'SE', name: 'Stockholm, İsveç' },
      'copenhagen': { timezone: 'Europe/Copenhagen', code: 'DK', name: 'Copenhagen, Danimarka' },
      'dublin': { timezone: 'Europe/Dublin', code: 'IE', name: 'Dublin, İrlandiya' },
      'brussels': { timezone: 'Europe/Brussels', code: 'BE', name: 'Brussels, Belçika' },
      'zurich': { timezone: 'Europe/Zurich', code: 'CH', name: 'Zurich, İsveçrə' },
      'milan': { timezone: 'Europe/Rome', code: 'IT', name: 'Milan, İtaliya' },
      'barcelona': { timezone: 'Europe/Madrid', code: 'ES', name: 'Barcelona, İspaniya' },
      'mumbai': { timezone: 'Asia/Kolkata', code: 'IN', name: 'Mumbai, Hindistan' },
      'beijing': { timezone: 'Asia/Shanghai', code: 'CN', name: 'Beijing, Çin' },
      'shanghai': { timezone: 'Asia/Shanghai', code: 'CN', name: 'Shanghai, Çin' },
      'hongkong': { timezone: 'Asia/Hong_Kong', code: 'HK', name: 'Hong Kong' },
      'taipei': { timezone: 'Asia/Taipei', code: 'TW', name: 'Taipei, Tayvan' },
      'bangkok': { timezone: 'Asia/Bangkok', code: 'TH', name: 'Bangkok, Tailand' },
      'jakarta': { timezone: 'Asia/Jakarta', code: 'ID', name: 'Jakarta, İndoneziya' },
      'manila': { timezone: 'Asia/Manila', code: 'PH', name: 'Manila, Filippin' },
      'seoul': { timezone: 'Asia/Seoul', code: 'KR', name: 'Seoul, Cənubi Koreya' },
      'dubai': { timezone: 'Asia/Dubai', code: 'AE', name: 'Dubai, BƏƏ' },
      'riyadh': { timezone: 'Asia/Riyadh', code: 'SA', name: 'Riyad, Səudiyyə Ərəbistanı' },
      'telaviv': { timezone: 'Asia/Jerusalem', code: 'IL', name: 'Tel Aviv, İsrail' },
      'cairo': { timezone: 'Africa/Cairo', code: 'EG', name: 'Cairo, Misir' },
      'sydney': { timezone: 'Australia/Sydney', code: 'AU', name: 'Sydney, Avstraliya' },
      'melbourne': { timezone: 'Australia/Melbourne', code: 'AU', name: 'Melbourne, Avstraliya' },
      'tokyo': { name: 'Tokyo, Yaponiya', timezone: 'Asia/Tokyo', code: 'JP' }
    };

    const cleanCityName = lowerCityName.replace(/\s+/g, '');

    setTimeout(function () {
      if (cityTimezones[cleanCityName]) {
        const cityData = cityTimezones[cleanCityName];
        const newCity = {
          name: cityData.name,
          timezone: cityData.timezone,
          code: cityData.code,
          isCustom: true
        };

        setCustomCities(prev => {
          const exists = prev.some(city => city.name === newCity.name);
          if (!exists) return [...prev, newCity];
          return prev;
        });
      }

      setIsLoading(false);
      setLastSearched(cleanCityName);
    }, 1000);
  };

  useEffect(function () {
    if (searchTerm.trim().length >= 3) {
      const cleanSearch = searchTerm.toLowerCase().trim().replace(/\s+/g, '');
      if (cleanSearch === lastSearched) return;

      const existsInList = [...timezones, ...customCities].some(tz =>
        tz.name.toLowerCase().replace(/\s+/g, '').includes(cleanSearch)
      );

      if (!existsInList) {
        addCustomCity(searchTerm);
      }
    }
  }, [searchTerm]);

  const filteredTimezones = timezones.filter(function (tz) {
    if (!searchTerm.trim()) return true;
    return tz.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredCustomCities = customCities.filter(function (tz) {
    if (!searchTerm.trim()) return true;
    return tz.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const allTimezones = [...filteredTimezones, ...filteredCustomCities];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: `rgba(255, 255, 255, ${0.05 + (i * 0.02)})`,
              width: `${100 + (i * 50)}px`,
              height: `${100 + (i * 50)}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + (i * 2)}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(10deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div style={{
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '30px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontSize: '40px',
            animation: 'pulse 2s ease-in-out infinite'
          }}>🌍</div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Dünya Saatları
          </h1>
        </div>

        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '16px',
          marginBottom: '25px',
          textAlign: 'center',
          margin: '0 auto 25px',
          maxWidth: '600px',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
        }}>
          Dəqiq saatlar ilə bütün şəhərlərin vaxtını izləyin
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Şəhər adı yazın... (Ankara, Prague, Vienna)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              color: '#ffffff',
              fontSize: '16px',
              width: '100%',
              maxWidth: '500px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.02)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.target.style.transform = 'scale(1)';
            }}
          />
          {isLoading && (
            <div style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              animation: 'pulse 1s ease-in-out infinite'
            }}>
              ⏳ Əlavə edilir...
            </div>
          )}
        </div>

        {customCities.length > 0 && (
          <div style={{
            marginTop: '15px',
            padding: '12px 20px',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '25px',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '500px',
            margin: '15px auto 0',
            textAlign: 'center',
            animation: 'slideIn 0.5s ease-out'
          }}>
            ✅ {customCities.length} yeni şəhər əlavə edildi
          </div>
        )}
      </div>
      <div style={{
        width: '100%',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '25px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1
      }}>
        {allTimezones.length === 0 && !searchTerm ? (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            gridColumn: '1 / -1',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <p style={{ marginBottom: '12px', fontSize: '18px' }}>
              Şəhər axtarışı üçün yuxarıda yazın
            </p>
            <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '16px' }}>
              Hazırda {timezones.length} şəhər mövcuddur
            </small>
          </div>
        ) : allTimezones.length === 0 && searchTerm ? (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            gridColumn: '1 / -1',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>😔</div>
            <p style={{ marginBottom: '8px', fontSize: '18px' }}>
              "{searchTerm}" üçün nəticə tapılmadı
            </p>
          </div>
        ) : (
          allTimezones.map((tz, index) => {
            const timeStr = getTimeForTimezone(tz.timezone);
            const timeOfDay = getTimeOfDay(tz.timezone);
            const timeColors = {
              'Səhər': {
                bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                border: 'rgba(252, 182, 159, 0.5)',
                text: '#8b4513',
                emoji: '🌅',
                shadow: 'rgba(252, 182, 159, 0.4)'
              },
              'Gündüz': {
                bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                border: 'rgba(168, 237, 234, 0.5)',
                text: '#2c5282',
                emoji: '☀️',
                shadow: 'rgba(168, 237, 234, 0.4)'
              },
              'Axşam': {
                bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                border: 'rgba(255, 154, 108, 0.5)',
                text: '#8b4513',
                emoji: '🌇',
                shadow: 'rgba(255, 154, 108, 0.4)'
              },
              'Gecə': {
                bg: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
                border: 'rgba(52, 152, 219, 0.5)',
                text: '#ffffff',
                emoji: '🌙',
                shadow: 'rgba(52, 152, 219, 0.4)'
              }
            };

            const colors = timeColors[timeOfDay];
            const offset = getTimezoneOffsetNumber(tz.timezone);

            return (
              <div
                key={`${index}-${tz.isCustom ? 'custom' : 'standard'}`}
                style={{
                  background: colors.bg,
                  backdropFilter: 'blur(20px)',
                  border: `2px solid ${colors.border}`,
                  borderRadius: '24px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: `0 20px 40px ${colors.shadow}`,
                  boxSizing: 'border-box',
                  minHeight: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-10px) scale(1.02)';
                  e.target.style.boxShadow = `0 30px 60px ${colors.shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = `0 20px 40px ${colors.shadow}`;
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${colors.border}, transparent, ${colors.border})`,
                  opacity: 0.6
                }} />

                {tz.isCustom && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'linear-gradient(45deg, #10b981, #059669)',
                    color: 'white',
                    fontSize: '11px',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    YENİ
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  marginTop: tz.isCustom ? '20px' : '0'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    margin: 0,
                    color: colors.text,
                    flex: 1,
                    lineHeight: 1.3,
                    textShadow: timeOfDay === 'Gecə' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                  }}>
                    {tz.name}
                  </h3>
                  <div style={{
                    color: colors.text,
                    fontSize: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    flexShrink: 0,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textShadow: timeOfDay === 'Gecə' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                  }}>
                    {tz.code}
                  </div>
                </div>

                <div style={{
                  color: colors.text,
                  fontSize: '14px',
                  opacity: 0.8,
                  fontWeight: '500',
                  textShadow: timeOfDay === 'Gecə' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                }}>
                  {timeStr.split(', ')[0]}
                </div>

                <div style={{
                  color: colors.text,
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: '600',
                  textShadow: timeOfDay === 'Gecə' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                }}>
                  <span style={{
                    fontSize: '20px',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}>
                    {colors.emoji}
                  </span>
                  {timeOfDay}
                </div>

                <div style={{
                  fontFamily: 'Monaco, "Roboto Mono", monospace',
                  fontSize: '28px',
                  fontWeight: '800',
                  textAlign: 'center',
                  marginTop: '16px',
                  color: colors.text,
                  letterSpacing: '2px',
                  textShadow: timeOfDay === 'Gecə' ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.2)',
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  {timeStr.split(', ')[1]}
                </div>

                <div style={{
                  color: colors.text,
                  fontSize: '12px',
                  opacity: 0.7,
                  textAlign: 'center',
                  marginTop: '8px',
                  fontWeight: '500',
                  textShadow: timeOfDay === 'Gecə' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                }}>
                  UTC{offset >= 0 ? '+' : ''}{offset}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
                  opacity: 0.4
                }} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WorldClock;