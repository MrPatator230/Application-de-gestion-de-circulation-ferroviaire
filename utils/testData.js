export const initTestData = () => {
  // Stations de test
  const stations = [
    { name: 'Dijon' },
    { name: 'Besançon' },
    { name: 'Belfort' },
    { name: 'Montbéliard' },
    { name: 'Dole' },
    { name: 'Seurre' },
    { name: 'Dijon Ville' },
    { name: 'Lons-le-Saunier' },
    { name: 'Vesoul' },
    { name: 'Gray' }
  ];

  // Horaires de test
  const schedules = [
    {
      id: 1,
      trainNumber: 'TER123',
      departureStation: 'Seurre',
      arrivalStation: 'Dijon Ville',
      viaStations: ['Dole'],
      departureTime: '09:00',
      arrivalTime: '10:15',
      trainType: 'TER',
      joursCirculation: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
    },
    {
      id: 2,
      trainNumber: 'TER456',
      departureStation: 'Seurre',
      arrivalStation: 'Dijon Ville',
      viaStations: ['Beaune'],
      departureTime: '10:30',
      arrivalTime: '11:45',
      trainType: 'TER',
      joursCirculation: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
    },
    {
      id: 3,
      trainNumber: 'TGV789',
      departureStation: 'Dijon Ville',
      arrivalStation: 'Belfort',
      viaStations: ['Besançon', 'Montbéliard'],
      departureTime: '08:00',
      arrivalTime: '09:45',
      trainType: 'TGV',
      joursCirculation: ['lundi', 'mercredi', 'vendredi']
    },
    {
      id: 4,
      trainNumber: 'TER234',
      departureStation: 'Besançon',
      arrivalStation: 'Dijon Ville',
      viaStations: ['Dole'],
      departureTime: '11:00',
      arrivalTime: '12:15',
      trainType: 'TER',
      joursCirculation: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
    },
    {
      id: 5,
      trainNumber: 'TER567',
      departureStation: 'Dijon Ville',
      arrivalStation: 'Besançon',
      viaStations: ['Dole', 'Auxonne'],
      departureTime: '14:30',
      arrivalTime: '15:45',
      trainType: 'TER',
      joursCirculation: ['samedi', 'dimanche']
    }
  ];

  // Sauvegarder dans localStorage si on est côté client
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('stations')) {
      localStorage.setItem('stations', JSON.stringify(stations));
    }
    if (!localStorage.getItem('schedules')) {
      localStorage.setItem('schedules', JSON.stringify(schedules));
    }
  }
};
