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
    { name: 'New York, ABŞ', timezone: 'America/New_York', code: 'US' }
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
  function getTimezoneOffset(timezone) {
    try {
      const now = new Date();
      const localTime = now.getTime();
      const localOffset = now.getTimezoneOffset() * 60000;

      const utc = localTime + localOffset;

      const targetTime = new Date(utc + (getTimezoneOffsetNumber(timezone) * 3600000));
      const targetOffset = targetTime.getTimezoneOffset() * 60000;

      const offset = (localOffset - targetOffset) / 3600000;
      return offset;
    } catch (error) {
      return getTimezoneOffsetNumber(timezone);
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
      'amsterdam': { timezone: 'Europe/Amsterdam', code: 'NL', name: 'Amsterdam, Holland' },
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
      'venice': { timezone: 'Europe/Rome', code: 'IT', name: 'Venice, İtaliya' },
      'barcelona': { timezone: 'Europe/Madrid', code: 'ES', name: 'Barcelona, İspaniya' },
      'capetown': { timezone: 'Africa/Johannesburg', code: 'ZA', name: 'Cape Town, Cənubi Afrika' },
      'johannesburg': { timezone: 'Africa/Johannesburg', code: 'ZA', name: 'Johannesburg, Cənubi Afrika' },
      'nairobi': { timezone: 'Africa/Nairobi', code: 'KE', name: 'Nairobi, Keniya' },
      'buenosaires': { timezone: 'America/Argentina/Buenos_Aires', code: 'AR', name: 'Buenos Aires, Argentina' },
      'santiago': { timezone: 'America/Santiago', code: 'CL', name: 'Santiago, Çili' },
      'lima': { timezone: 'America/Lima', code: 'PE', name: 'Lima, Peru' },
      'bogota': { timezone: 'America/Bogota', code: 'CO', name: 'Bogota, Kolumbiya' },
      'mumbai': { timezone: 'Asia/Kolkata', code: 'IN', name: 'Mumbai, Hindistan' },
      'beijing': { timezone: 'Asia/Shanghai', code: 'CN', name: 'Beijing, Çin' },
      'shanghai': { timezone: 'Asia/Shanghai', code: 'CN', name: 'Shanghai, Çin' },
      'hongkong': { timezone: 'Asia/Hong_Kong', code: 'HK', name: 'Hong Kong' },
      'taipei': { timezone: 'Asia/Taipei', code: 'TW', name: 'Taipei, Tayvan' },
      'bangkok': { timezone: 'Asia/Bangkok', code: 'TH', name: 'Bangkok, Tailand' },
      'jakarta': { timezone: 'Asia/Jakarta', code: 'ID', name: 'Jakarta, İndoneziya' },
      'kualalumpur': { timezone: 'Asia/Kuala_Lumpur', code: 'MY', name: 'Kuala Lumpur, Malayziya' },
      'manila': { timezone: 'Asia/Manila', code: 'PH', name: 'Manila, Filippin' },
      'hanoi': { timezone: 'Asia/Bangkok', code: 'VN', name: 'Hanoi, Vyetnam' },
      'seoul': { timezone: 'Asia/Seoul', code: 'KR', name: 'Seoul, Cənubi Koreya' },
      'dubai': { timezone: 'Asia/Dubai', code: 'AE', name: 'Dubai, BƏƏ' },
      'riyadh': { timezone: 'Asia/Riyadh', code: 'SA', name: 'Riyad, Səudiyyə Ərəbistanı' },
      'telaviv': { timezone: 'Asia/Jerusalem', code: 'IL', name: 'Tel Aviv, İsrail' },
      'cairo': { timezone: 'Africa/Cairo', code: 'EG', name: 'Cairo, Misir' },
      'auckland': { timezone: 'Pacific/Auckland', code: 'NZ', name: 'Auckland, Yeni Zelandiya' },
      'sydney': { timezone: 'Australia/Sydney', code: 'AU', name: 'Sydney, Avstraliya' },
      'melbourne': { timezone: 'Australia/Melbourne', code: 'AU', name: 'Melbourne, Avstraliya' },
      'perth': { timezone: 'Australia/Perth', code: 'AU', name: 'Perth, Avstraliya' },
      'los_angeles': { name: 'Los Angeles, ABŞ', timezone: 'America/Los_Angeles', code: 'US' },
      'tokyo': { name: 'Tokyo, Yaponiya', timezone: 'Asia/Tokyo', code: 'JP' },
      'pekin': { name: 'Pekin, Çin', timezone: 'Asia/Shanghai', code: 'CN' },
      'delhi': { name: 'Delhi, Hindistan', timezone: 'Asia/Kolkata', code: 'IN' },
      'dubai': { name: 'Dubai, BƏƏ', timezone: 'Asia/Dubai', code: 'AE' },
      'kairo': { name: 'Kairo, Misir', timezone: 'Africa/Cairo', code: 'EG' },
      'sidney': { name: 'Sidney, Avstraliya', timezone: 'Australia/Sydney', code: 'AU' },
      'sao_paulo': { name: 'São Paulo, Braziliya', timezone: 'America/Sao_Paulo', code: 'BR' },
      'mexiko': { name: 'Mexiko, Mexiko', timezone: 'America/Mexico_City', code: 'MX' },
      'seoul': { name: 'Seoul, Cənubi Koreya', timezone: 'Asia/Seoul', code: 'KR' },
      'bangkok': { name: 'Bangkok, Tailand', timezone: 'Asia/Bangkok', code: 'TH' },
      'singapur': { name: 'Singapur', timezone: 'Asia/Singapore', code: 'SG' },
      'toronto': { name: 'Toronto, Kanada', timezone: 'America/Toronto', code: 'CA' },
      'tehrann': { name: 'Tehrann, İran', timezone: 'Asia/Tehran', code: 'IR' },
      'riyad': { name: 'Riyad, Səudiyyə Ərəbistanı', timezone: 'Asia/Riyadh', code: 'SA' },
      'kiyev': { name: 'Kiyev, Ukrayna', timezone: 'Europe/Kiev', code: 'UA' },
      'roma': { name: 'Roma, İtaliya', timezone: 'Europe/Rome', code: 'IT' },
      'madrid': { name: 'Madrid, İspaniya', timezone: 'Europe/Madrid', code: 'ES' },
      'karakas': { name: 'Karakas, Venesuela', timezone: 'America/Caracas', code: 'VE' },
      'lagos': { name: 'Lagos, Nigeriya', timezone: 'Africa/Lagos', code: 'NG' },
      'mumbay': { name: 'Mumbay, Hindistan', timezone: 'Asia/Kolkata', code: 'IN' }
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
      } else {
        console.log('Şəhər tapılmadı:', cleanCityName);
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
      backgroundColor: '#f0f4f8',
      color: '#2d3748',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#f0f4f8',
        padding: '20px',
        borderBottom: '1px solid #cbd5e0',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '24px', color: '#4299e1' }}>🌍</div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2d3748',
            margin: 0
          }}>
            Dünya Saatları
          </h1>
        </div>

        <p style={{
          color: '#718096',
          fontSize: '14px',
          marginBottom: '16px',
          textAlign: 'center',
          margin: '0 auto',
          maxWidth: '500px'
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
            placeholder="Şəhər adı yazın... (amsterdam, prague, vienna)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 16px',
              backgroundColor: '#ffffff',
              border: '2px solid #cbd5e0',
              borderRadius: '12px',
              color: '#2d3748',
              fontSize: '16px',
              width: '100%',
              maxWidth: '500px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
          />
          {isLoading && (
            <div style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#4299e1',
              fontSize: '12px'
            }}>
              ⏳ Əlavə edilir...
            </div>
          )}
        </div>

        {customCities.length > 0 && (
          <div style={{
            marginTop: '10px',
            padding: '8px 12px',
            backgroundColor: '#e6fffa',
            border: '1px solid #81e6d9',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#234e52',
            maxWidth: '500px',
            margin: '10px auto 0'
          }}>
            ✅ {customCities.length} yeni şəhər əlavə edildi
          </div>
        )}
      </div>
      <div style={{
        width: '100%',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        boxSizing: 'border-box'
      }}>
        {allTimezones.length === 0 && !searchTerm ? (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: '#718096',
            gridColumn: '1 / -1',
            width: '100%'
          }}>
            <p style={{ marginBottom: '8px', fontSize: '16px' }}>
              Şəhər axtarışı üçün yuxarıda yazın
            </p>
            <small style={{ color: '#a0aec0', fontSize: '14px' }}>
              Hazırda {timezones.length} şəhər mövcuddur
            </small>
          </div>
        ) : allTimezones.length === 0 && searchTerm ? (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: '#718096',
            gridColumn: '1 / -1',
            width: '100%'
          }}>
            <p style={{ marginBottom: '8px', fontSize: '16px' }}>
              "{searchTerm}" üçün nəticə tapılmadı
            </p>
          </div>
        ) : (
          allTimezones.map((tz, index) => {
            const timeStr = getTimeForTimezone(tz.timezone);
            const timeOfDay = getTimeOfDay(tz.timezone);
            const timeColors = {
              'Səhər': { bg: '#ebf8ff', border: '#90cdf4', text: '#2b6cb0' },
              'Gündüz': { bg: '#fefcbf', border: '#faf089', text: '#744210' },
              'Axşam': { bg: '#fed7d7', border: '#feb2b2', text: '#742a2a' },
              'Gecə': { bg: '#e9d8fd', border: '#d6bcfa', text: '#44337a' }
            };

            const colors = timeColors[timeOfDay];
            const offset = getTimezoneOffsetNumber(tz.timezone);

            return (
              <div
                key={`${index}-${tz.isCustom ? 'custom' : 'standard'}`}
                style={{
                  backgroundColor: colors.bg,
                  border: `2px solid ${colors.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
                  boxSizing: 'border-box',
                  minHeight: '160px',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                }}
              >
                {tz.isCustom && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#48bb78',
                    color: 'white',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    YENİ
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  marginTop: tz.isCustom ? '12px' : '0'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: 0,
                    color: colors.text,
                    flex: 1
                  }}>
                    {tz.name}
                  </h3>
                  <div style={{
                    color: colors.text,
                    fontSize: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>
                    {tz.code}
                  </div>
                </div>

                <div style={{
                  color: colors.text,
                  fontSize: '13px',
                  opacity: 0.8
                }}>
                  {timeStr.split(', ')[0]}
                </div>

                <div style={{
                  color: colors.text,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '500'
                }}>
                  <span style={{ fontSize: '14px' }}>
                    {timeOfDay === 'Səhər' ? '🌅' :
                      timeOfDay === 'Gündüz' ? '☀️' :
                        timeOfDay === 'Axşam' ? '🌇' : '🌙'}
                  </span>
                  {timeOfDay}
                </div>

                <div style={{
                  fontFamily: 'Monaco, Menlo, monospace',
                  fontSize: '24px',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginTop: '12px',
                  color: colors.text,
                  letterSpacing: '1px'
                }}>
                  {timeStr.split(', ')[1]}
                </div>

                <div style={{
                  color: colors.text,
                  fontSize: '11px',
                  opacity: 0.7,
                  textAlign: 'center',
                  marginTop: '5px'
                }}>
                  UTC{offset >= 0 ? '+' : ''}{offset}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WorldClock;