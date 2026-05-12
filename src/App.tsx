/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Train, 
  Calendar, 
  Map, 
  Info, 
  Compass, 
  Camera, 
  Coffee, 
  ShoppingBag,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Waves,
  Music,
  Star,
  Users,
  Film,
  Palette,
  PartyPopper,
  Ticket,
  Maximize2,
  ScanLine
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Agency } from '@/vite.config';

// Image imports — Vite requires ES module imports for assets in src/
import imgKraljTvrtko from './assets/images/KraljTvrko13.webp';
import imgTrain from './assets/images/regenerated_image_1778513665739.jpg';
import imgJezero from './assets/images/jezero.webp';
import imgSlanaBanja from './assets/images/tuzla25.webp';
import imgSummer from './assets/images/regenerated_image_1778513666988.jpg';
import imgQrCode01 from './assets/images/input_file_01.png';
import imgQrCode2 from './assets/images/input_file_2.png';
import imgRouteMap from './assets/images/put_vozic.jpg';

// --- Data Structures ---

interface POI {
  id: string;
  title: string;
  description: string;
  image: string;
  funFact: string;
  qrCode?: string;
}

const poiData: Record<string, POI> = {
  "poi_tvrtko": {
    id: "poi_tvrtko",
    title: "King Tvrtko I Kotromanić",
    description: "The first Bosnian King (1377–1391) and the most significant ruler of medieval Bosnia. He is a symbol of pride for Tuzla, where his monument stands over Freedom Square, looking towards the salt lakes he once protected.",
    image: imgKraljTvrtko,
    funFact: "Under King Tvrtko, the salt riches of Tuzla were so vast that they funded the expansion of the Bosnian Kingdom into one of the most powerful states in the Balkans.",
    qrCode: imgQrCode01
  },
  "poi_train": {
    id: "poi_train",
    title: "The Tourist Train",
    description: "This charming train connects the historic Freedom Square with the Pannonian Lakes. It's not just transport; it's a moving viewpoint of Tuzla's urban soul and heritage.",
    image: imgTrain,
    funFact: "It's a favorite among local children who call it simply 'Vozić' (The Little Train).",
    qrCode: imgQrCode01
  },
  "poi_panonika": {
    id: "poi_panonika",
    title: "Pannonian Salt Lakes",
    description: "The only salt lakes in Europe that are located in the center of a city. These artificial lakes contain real salt water, mimicking the minerals of the Pannonian Sea that existed millions of years ago.",
    image: imgJezero,
    funFact: "Thousands of liters of water are filtered daily to maintain its perfect crystal-clear salinity.",
    qrCode: imgQrCode2
  },
  "poi_slana_banja": {
    id: "poi_slana_banja",
    title: "Slana Banja Park",
    description: "One of the most beautiful memorial complexes in Bosnia. It features paths for walking, monuments dedicated to modern history, and stunning views over the salt lakes.",
    image: imgSlanaBanja,
    funFact: "The park is nicknamed the 'Lungs of the City' due to its dense greenery and fresh air directly above the lake complex.",
    qrCode: imgQrCode2
  },
};

const agencies: Agency[] = [
  {
    name: "Golden Tours",
    address: "Maršala Tita 2a-2b (Avaz-Robot)",
    hours: "Mon-Fri: 09:00-17:00, Sat: 09:00-13:00",
    phone: "+387 35 249 220",
    website: "https://goldentours.ba",
    localProgram: "Yes (Canton tours)",
    description: "One of the most established agencies in Tuzla, specializing in both outbound and local Canton-wide excursions.",
    isLocalSpecialist: true
  },
  {
    name: "Transturist",
    address: "Turalibegova 6",
    hours: "Mon-Fri: 08:00-17:00, Sat: 08:30-13:00",
    phone: "+387 35 249 301",
    website: "https://transturist.com",
    localProgram: "Yes (Group city tours)",
    description: "Known for their bus services, they also offer comprehensive group tours of the city landmarks.",
    isLocalSpecialist: true
  },
  {
    name: "Elle Travel",
    address: "Turalibegova 22",
    hours: "Mon-Fri: 09:00-17:00, Sat: 09:00-13:00",
    phone: "+387 61 186 200",
    website: "https://elletravel.ba",
    localProgram: "Custom requests",
    description: "Boutique agency focused on personalized travel experiences and custom local itineraries."
  },
  {
    name: "Hit Tours",
    address: "Bankerova bb",
    hours: "Mon-Fri: 08:30-17:00",
    phone: "+387 35 258 311",
    website: "https://hit-tours.ba",
    localProgram: "Regional excursions",
    description: "Provides regular regional excursions including visits to medieval fortresses in the Canton."
  },
  {
    name: "Travelino",
    address: "RK Tuzlanka (1st Floor)",
    hours: "Mon-Sat: 08:00-21:30",
    phone: "+387 35 321 555",
    website: "https://tuzlanka.ba",
    localProgram: "No (Focus on Abroad)",
    description: "Conveniently located in the mall, primarily focused on international holiday packages."
  },
  {
    name: "Putnik d.o.o.",
    address: "Đ. Mihajlovića 4 (Korzo)",
    hours: "Mon-Fri: 08:00-16:00",
    phone: "+387 35 252 540",
    website: "https://tztz.ba",
    localProgram: "Yes (Tuzla City)",
    isLocalSpecialist: true,
    description: "Historic agency located on the main pedestrian street, expert in local city heritage tours."
  }
];

const itineraries = {
  threeDay: [
    {
      day: 1,
      title: "The Core of Salt",
      description: "Immerse yourself in the historical center and the unique salt lakes.",
      items: [
        "Start at Freedom Square (Trg Slobode), the largest square in BiH.",
        "Visit Charshiya Mosque and Salt Square (Trg Soli) open-air museum.",
        "Afternoon at Pannonian Lakes (Panonika) for a swim.",
        "Visit the Neolithic Stilt House Settlement on the lake site."
      ]
    },
    {
      day: 2,
      title: "Culture & Nature",
      description: "Explore the artistic side and memorial parks of the city.",
      items: [
        "Morning walk through Slana Banja Park memorial complex.",
        "Visit the International Portrait Gallery (Međunarodna galerija portreta).",
        "Evening dinner at 'Lovački Dom' or 'Zlatnik' for traditional cuisine."
      ]
    },
    {
      day: 3,
      title: "Shopping & Views",
      description: "Get a local feel for the commerce and modern life.",
      items: [
        "Visit the Museum of Eastern Bosnia.",
        "Head to Bingo Zoo Park for a family afternoon.",
        "Wrap up with coffee on the Korzo pedestrian street."
      ]
    }
  ],
  sevenDay: [
    {
      day: "1-3",
      title: "Tuzla City Exploration",
      description: "Follow the 3-day itinerary focusing on the city center and Pannonian Lakes."
    },
    {
      day: 4,
      title: "Srebrenik Fortress",
      description: "Medieval adventure outside the city.",
      items: [
        "45-minute drive to Gradina Fortress (Srebrenik).",
        "Explore the best-preserved medieval castle in BiH, linked to King Tvrtko."
      ]
    },
    {
      day: 5,
      title: "The White Tower",
      description: "Visit the dragon city of Gradačac.",
      items: [
        "Visit Captain Gradaščević Castle (Bijela Kula).",
        "Relax at Hazna and Vidara lakes."
      ]
    },
    {
      day: 6,
      title: "Mountain Konjuh",
      description: "Hiking and fresh air south of the city.",
      items: [
        "Head to Protected Landscape Konjuh.",
        "Visit 'Djevojačka pećina' (Maiden's Cave).",
        "Hike near Zlaća resort."
      ]
    },
    {
      day: 7,
      title: "Modrac & Banovići",
      description: "Lakeside dining and steam trains.",
      items: [
        "Lakeside lunch at Lake Modrac (Lukavac).",
        "Stop in Banovići for the 'Ćiro' steam train museum."
      ]
    }
  ]
};

const events = [
  {
    title: "Summer in Tuzla",
    date: "June - August",
    time: "All Day",
    location: "City Center & Panonika",
    description: "A season-long festival featuring open-air concerts, street performances, and sports tournaments.",
    category: "Festival",
    image: imgSummer
  },
  {
    title: "Tuzla Film Festival",
    date: "October 15-19",
    time: "18:00 - 23:00",
    location: "National Theater Tuzla",
    description: "A celebration of South-East European cinema with screenings and workshops.",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "International Blues Garden",
    date: "July 22",
    time: "20:00",
    location: "Art Center 'Sloboda'",
    description: "Annual blues festival attracting international artists and music lovers.",
    category: "Music",
    image: imgTrain
  },
  {
    title: "Kaleidoskop Festival",
    date: "July 24-28",
    time: "Evening",
    location: "Park of Culture",
    description: "International art and music festival promoting youth culture and urban creativity.",
    category: "Art",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400"
  }
];

// --- Components ---

function AgencyCard(props: { agency: Agency, key?: any }) {
  const { agency } = props;
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full"
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-serif text-slate-800">{agency.name}</h3>
          {agency.isLocalSpecialist && (
            <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Local Specialist
            </span>
          )}
        </div>
        
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          {agency.description}
        </p>

        <div className="space-y-3 font-sans">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
            <span className="text-sm text-slate-600">{agency.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
            <span className="text-sm text-slate-600">{agency.hours}</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
            <span className="text-sm text-slate-600">{agency.phone}</span>
          </div>
          <div className="flex items-start gap-3">
            <Map className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
            <div className="text-sm">
              <span className="font-semibold text-slate-700">Tuzla Program:</span>
              <span className="ml-2 text-slate-600">{agency.localProgram}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
        <a 
          href={agency.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-sky-50 hover:border-sky-200 transition-colors"
        >
          <Globe className="w-4 h-4" />
          Visit Website
          <ExternalLink className="w-3 h-3 opacity-50" />
        </a>
      </div>
    </motion.div>
  );
}

function EventCard(props: { event: any, key?: any }) {
  const { event } = props;
  let Icon = Users;
  let bgColor = "bg-sky-50";
  let iconColor = "text-sky-500";
  let borderColor = "border-sky-100";

  switch (event.category) {
    case 'Music':
      Icon = Music;
      bgColor = "bg-rose-50";
      iconColor = "text-rose-500";
      borderColor = "border-rose-100";
      break;
    case 'Culture':
      Icon = Film;
      bgColor = "bg-amber-50";
      iconColor = "text-amber-500";
      borderColor = "border-amber-100";
      break;
    case 'Festival':
      Icon = PartyPopper;
      bgColor = "bg-indigo-50";
      iconColor = "text-indigo-500";
      borderColor = "border-indigo-100";
      break;
    case 'Art':
      Icon = Palette;
      bgColor = "bg-emerald-50";
      iconColor = "text-emerald-500";
      borderColor = "border-emerald-100";
      break;
  }
  
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col sm:flex-row group h-full">
      <div className="sm:w-32 h-32 sm:h-auto relative overflow-hidden shrink-0">
        <img 
          src={event.image} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 opacity-40 mix-blend-multiply ${bgColor.replace('bg-', 'bg-')}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${bgColor} p-2 rounded-lg border ${borderColor} shadow-sm`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      </div>
      <div className="p-5 flex-grow">
        <div className="flex flex-col gap-1 mb-2">
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold font-serif text-slate-800 leading-tight">{event.title}</h4>
            <span className={`text-[10px] font-bold ${iconColor} uppercase tracking-wider px-2 py-0.5 rounded-full ${bgColor} border ${borderColor}`}>
              {event.category}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <Calendar className="w-3 h-3 text-sky-400" />
            {event.date}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4 line-clamp-2 md:line-clamp-3">{event.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-300" />
            {event.time}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-sky-300" />
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
}

function ItineraryDay(props: { data: any, isLong?: boolean, key?: any }) {
  const { data, isLong } = props;
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-sky-100 last:border-0 last:pb-0">
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-white" />
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Day {data.day}</span>
        <h4 className="text-lg font-bold font-serif text-slate-800">{data.title}</h4>
      </div>
      <p className="text-slate-500 text-sm mb-3 italic">{data.description}</p>
      {data.items && (
        <ul className="space-y-2">
          {data.items.map((item: string, i: number) => (
            <li key={i} className="text-sm text-slate-600 flex gap-2">
              <ChevronRight className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function QRScanner({ onScan, onClose, onShowPassport }: { onScan: (decodedText: string) => void, onClose: () => void, onShowPassport: () => void }) {
  useEffect(() => {
    let scanner: import('html5-qrcode').Html5QrcodeScanner | null = null;
    let isMounted = true;

    const loadScanner = async () => {
      const { Html5QrcodeScanner } = await import('html5-qrcode');

      if (!isMounted) {
        return;
      }

      scanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false,
      );

      scanner.render(onScan, () => {
        // Quietly ignore scan errors.
      });
    };

    loadScanner().catch((error) => {
      console.error('Failed to load scanner', error);
    });

    return () => {
      isMounted = false;
      scanner?.clear().catch((error) => console.error('Failed to clear scanner', error));
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden relative shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold font-serif text-slate-800 italic">Scan POI Code</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div id="reader" className="w-full aspect-square" />
        <div className="p-6 bg-slate-50 flex flex-col items-center gap-4">
          <p className="text-center text-sm text-slate-500">
            Point your camera at a QR code located near city monuments.
          </p>
          <button 
            onClick={onShowPassport}
            className="flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors"
          >
            <Ticket className="w-4 h-4" />
            Don't have a code? View Digital Passport
          </button>
        </div>
      </div>
    </div>
  );
}

function DigitalPassport({ onClose }: { onClose: () => void }) {
  const poisWithCodes = Object.values(poiData).filter(poi => poi.qrCode);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-bold font-serif italic text-slate-900">Digital Passport</h2>
            <p className="text-slate-500 mt-1">Scan these codes to unlock historical insights</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto grid sm:grid-cols-2 gap-8">
          {poisWithCodes.map(poi => (
            <div key={poi.id} className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 group-hover:scale-105 transition-transform duration-500">
                <img src={poi.qrCode} alt={`QR Code for ${poi.title}`} className="w-32 h-32" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-900">{poi.title}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">POI ID: {poi.id}</p>
              </div>
            </div>
          ))}
          {poisWithCodes.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 italic">
              No QR codes available yet. Check back soon!
            </div>
          )}
        </div>
        
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            These codes are physically located at our monuments. Use them to collect your digital visit stamps!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function POIModal({ poi, onClose }: { poi: POI, onClose: () => void }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="relative h-64">
          <img 
            src={poi.image} 
            alt={poi.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 left-8 flex items-center gap-3">
             <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Info className="text-white w-6 h-6" />
             </div>
             <h3 className="text-3xl font-bold font-serif italic text-white tracking-tight">{poi.title}</h3>
          </div>
          {poi.qrCode && (
            <button 
              onClick={() => setShowQR(!showQR)}
              className="absolute bottom-6 right-8 p-3 bg-white text-sky-600 rounded-xl shadow-lg border border-sky-100 hover:bg-sky-50 transition-all font-bold text-xs flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              {showQR ? "HIDE CODE" : "VIEW CODE"}
            </button>
          )}
        </div>
        <div className="p-8 relative">
          <AnimatePresence>
            {showQR && poi.qrCode && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 mb-6">
                  <img src={poi.qrCode} alt="POI QR Code" className="w-48 h-48" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Monument QR Code</h4>
                <p className="text-slate-500 text-sm mb-6">Found near the physical location of {poi.title}</p>
                <button 
                  onClick={() => setShowQR(false)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm"
                >
                  Back to Info
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">
            {poi.description}
          </p>
          
          <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-200/40 rounded-full blur-2xl transition-transform group-hover:scale-150" />
            <div className="relative z-10">
              <h4 className="text-sky-800 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-sky-500" />
                Did you know?
              </h4>
              <p className="text-sky-700 font-serif italic leading-relaxed">
                "{poi.funFact}"
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            Continue Exploring
            <Compass className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [activeItinerary, setActiveItinerary] = useState<'3' | '7'>('3');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [activePOI, setActivePOI] = useState<POI | null>(null);

  const handleScan = (decodedText: string) => {
    if (poiData[decodedText]) {
      setActivePOI(poiData[decodedText]);
      setIsScannerOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-sky-100 selection:text-sky-900">
      <AnimatePresence>
        {isScannerOpen && (
          <QRScanner 
            onScan={handleScan} 
            onClose={() => setIsScannerOpen(false)} 
            onShowPassport={() => {
              setIsScannerOpen(false);
              setIsPassportOpen(true);
            }} 
          />
        )}
        {activePOI && <POIModal poi={activePOI} onClose={() => setActivePOI(null)} />}
        {isPassportOpen && <DigitalPassport onClose={() => setIsPassportOpen(false)} />}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                <Waves className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif tracking-tight text-slate-900 italic">Visit Tuzla</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#agencies" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Agencies</a>
              <button 
                onClick={() => setIsPassportOpen(true)}
                className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1.5"
              >
                <Ticket className="w-4 h-4" />
                Digital Passport
              </button>
              <a href="#train" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Tourist Train</a>
              <a href="#events" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Events</a>
              <a href="#itineraries" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Tour Plans</a>
              <a href="#guide" className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-sm font-semibold transition-all">Book a Guide</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <button 
                  onClick={() => {
                    setIsPassportOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl bg-sky-50 text-sky-700 font-bold flex items-center gap-3"
                >
                  <Ticket className="w-5 h-5" />
                  Digital Passport
                </button>
                <a href="#agencies" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-600 font-medium">Agencies</a>
                <a href="#train" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-600 font-medium">Tourist Train</a>
                <a href="#events" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-600 font-medium">Events</a>
                <a href="#itineraries" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-600 font-medium">Tour Plans</a>
                <a href="#guide" onClick={() => setIsMenuOpen(false)} className="block px-4 py-4 bg-sky-500 text-white rounded-xl font-bold text-center">Book a Guide</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-sky-50 via-white to-sky-100 opacity-60" />
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-sky-600 uppercase bg-sky-50 rounded-full">
              Explore the City of Salt
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-slate-900 mb-8 leading-tight">
              Tuzla: Salt, Soul & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 italic">Eternal Summer</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
              From the unique Pannonian salt lakes to medieval fortresses in the hills, 
              discover the heart of one of Bosnia & Herzegovina's most vibrant regions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsScannerOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 group border-b-4 border-sky-700 active:border-b-0 active:translate-y-1"
              >
                <ScanLine className="w-5 h-5" />
                Scan POI Code
              </button>
              <a href="#itineraries" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                View Tour Plans
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Scanner Toggle */}
        <div className="fixed bottom-8 right-8 z-[90] hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsScannerOpen(true)}
            className="w-16 h-16 bg-sky-500 text-white rounded-2xl shadow-2xl flex items-center justify-center border-b-4 border-sky-700 hover:bg-sky-600 transition-all"
          >
            <ScanLine className="w-8 h-8" />
          </motion.button>
        </div>

        {/* Mobile Bar Scanner Toggle */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-[90]">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="w-full py-4 bg-sky-500 text-white rounded-2xl shadow-2xl flex items-center justify-center gap-3 font-bold border-b-4 border-sky-700 active:border-b-0 active:translate-y-1"
          >
            <Maximize2 className="w-5 h-5" />
            SCAN MONUMENT CODE
          </button>
        </div>
      </section>

      {/* Featured Statistics / Info */}
      <section className="max-w-5xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Waves, label: "Salt Lakes", val: "3 Lakes" },
            { icon: MapPin, label: "Canton", val: "Tuzla Region" },
            { icon: Coffee, label: "Experience", val: "Rich Gastro" },
            { icon: Camera, label: "History", val: "Neolithic" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              <item.icon className="w-6 h-6 text-sky-500 mb-3" />
              <span className="text-2xl font-bold text-slate-800">{item.val}</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sights & Heritage Section */}
      <section id="sights" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full text-amber-600 text-xs font-bold uppercase tracking-widest mb-4 border border-amber-100">
              <Star className="w-3 h-3" />
              Sights & Heritage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 italic">History You Can Touch</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Discover the landmarks that define Tuzla's soul, from medieval kings to the ancient salt sea.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {Object.values(poiData).map((poi) => (
              <motion.div 
                key={poi.id}
                whileHover={{ y: -10 }}
                onClick={() => setActivePOI(poi)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={poi.image} alt={poi.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white font-bold font-serif italic text-xl">{poi.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 italic">"{poi.funFact}"</p>
                  <div className="flex items-center gap-2 text-sky-500 text-xs font-bold uppercase tracking-tight">
                    <Info className="w-4 h-4" />
                    Learn More
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agencies Section */}
      <section id="agencies" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold font-serif text-slate-900 mb-4 tracking-tight italic">Travel Agencies</h2>
              <p className="text-slate-500 leading-relaxed">
                Most agencies specialize in outbound travel, but those marked as specialists offer incredible local insight into the city and the surrounding Canton.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <Info className="w-3.5 h-3.5" />
                Updated Weekly
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agencies.map((agency, i) => (
              <AgencyCard key={i} agency={agency} />
            ))}
          </div>
        </div>
      </section>

      {/* Tourist Train Feature */}
      <section id="train" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-500 animate-slide backdrop-blur-2xl opacity-10 rotate-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 text-sky-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Train className="w-4 h-4" />
              Local Favorite
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 group">
              <div className="relative group">
                <img 
                  src={imgTrain} 
                  alt="Turistički vozić" 
                  className="w-48 h-32 object-cover rounded-2xl shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif italic leading-tight">The Tourist Train <br/><span className="text-sky-400 font-sans tracking-tight">(Turistički vozić)</span></h2>
            </div>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Managed by "Traffic and Communications" Tuzla, this charming "small bus-train" is the best way to shuttle between the historic square and the lake complex while seeing city monuments.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <MapPin className="text-sky-500 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Route</h4>
                    <p className="text-sm text-slate-400">Trg Slobode ↔ Pannonica</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Calendar className="text-sky-500 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Operating Days</h4>
                    <p className="text-sm text-slate-400">Tue – Sun (Off on Mondays)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <ShoppingBag className="text-sky-500 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Price</h4>
                    <p className="text-sm text-slate-400">~ 1.00 BAM per ride</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Clock className="text-sky-500 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Status</h4>
                    <p className="text-sm text-slate-400">Seasonal / Weather Dep.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" />
                Schedule & Routes
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2">From Pannonian Lakes (Arrivals/Departures)</p>
                  <div className="flex flex-wrap gap-3">
                    {['11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                      <span key={time} className="px-3 py-1 bg-slate-700 rounded text-sm font-mono">{time}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2">From Freedom Square (Late Afternoon)</p>
                  <div className="flex flex-wrap gap-3">
                    {['17:00', '18:00'].map(time => (
                      <span key={time} className="px-3 py-1 bg-slate-700 rounded text-sm font-mono">{time}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 italic">
                * Times are approximate and weather dependent.
              </p>
            </div>
          </motion.div>
          
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl bg-white">
              <img 
                src={imgRouteMap} 
                alt="Tourist Train Route Map" 
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-500/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Itineraries Section */}
      <section id="itineraries" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-slate-900 mb-4 italic">Recommended Tour Plans</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Whether you have a weekend or a full week, Tuzla and its surrounding Canton have enough magic to keep you enchanted.
            </p>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
              <button 
                onClick={() => setActiveItinerary('3')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeItinerary === '3' ? 'bg-sky-500 text-white' : 'text-slate-500 hover:text-slate-800'}`}
              >
                3-Day "Salt & Soul"
              </button>
              <button 
                onClick={() => setActiveItinerary('7')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeItinerary === '7' ? 'bg-sky-500 text-white' : 'text-slate-500 hover:text-slate-800'}`}
              >
                7-Day "Royal Heritage"
              </button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <AnimatePresence mode="wait">
              {activeItinerary === '3' ? (
                <motion.div 
                  key="3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-10 text-center md:text-left">
                    <h3 className="text-2xl font-bold font-serif mb-2 text-sky-600">The Tuzla City Experience</h3>
                    <p className="text-slate-500 text-sm">A perfect deep dive into the city's heart and salt culture.</p>
                  </div>
                  <div className="mt-4">
                    {itineraries.threeDay.map((dayData, idx) => (
                      <ItineraryDay key={idx} data={dayData} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-10 text-center md:text-left">
                    <h3 className="text-2xl font-bold font-serif mb-2 text-sky-600">Tuzla Canton Heritage</h3>
                    <p className="text-slate-500 text-sm">Go beyond the city to discover medieval kings and mountain peaks.</p>
                  </div>
                  <div className="mt-4">
                    {itineraries.sevenDay.map((dayData, idx) => (
                      <ItineraryDay key={idx} data={dayData} isLong />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Event Calendar Section */}
      <section id="events" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-slate-900 mb-4 italic">Event Calendar</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Never miss a beat in the city. From local festivals to international music gatherings, Tuzla's pulse is always vibrant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
          
          <div className="mt-12 text-center text-slate-400 text-sm italic">
            Check the <a href="https://tuzla-tour-guide.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sky-500 underline">Visit Tuzla PWA</a> for real-time events, interactive maps, and your virtual tour guide.
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section id="guide" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sky-600 rounded-[3rem] p-10 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex-1 text-center md:text-left relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 italic tracking-tight">Need a Local <br/> Storyteller?</h2>
              <p className="text-sky-100 text-lg mb-10 leading-relaxed opacity-90">
                To hire a private certified tour guide or get official tourism brochures, contact the Tourist Information Center located in the city hub.
              </p>
              
              <div className="space-y-6 max-w-md mx-auto md:mx-0">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur shadow-sm flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-sky-200 uppercase tracking-widest">Phone Number</p>
                    <p className="text-xl font-semibold">+387 35 257 500</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur shadow-sm flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-sky-200 uppercase tracking-widest">Email Address</p>
                    <p className="text-xl font-semibold">info@tztz.ba</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-sm relative z-10">
              <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
                <h4 className="text-xl font-serif font-bold mb-4 italic text-slate-800">Verified Guides</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold">Tea Pentić</p>
                      <p className="text-xs text-slate-500">History Expert</p>
                    </div>
                    <Compass className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold">Edin Ogrešević</p>
                      <p className="text-xs text-slate-500">Regional Tours</p>
                    </div>
                    <Map className="w-5 h-5 text-sky-500" />
                  </div>
                </div>
                <button className="w-full py-4 bg-sky-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sky-600 transition-all">
                  Visit Tourist Office
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-serif font-bold text-center mb-12 italic">💡 Pro Tips for Visitors</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Water is Gold", d: "The tap water in Tuzla is safe and world-famous for its high quality. Fill up your bottle anywhere!" },
              { t: "Summer Rush", d: "Visiting Panonika in July? Be there before 09:00 AM to secure a spot. It's the most popular beach in BiH." },
              { t: "Virtual Guide", d: "Install our recommended PWA at https://tuzla-tour-guide.vercel.app for maps, events, and a virtual guide." }
            ].map((tip, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-bold mb-2 text-slate-800">{tip.t}</h4>
                <p className="text-sm text-slate-500">{tip.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Waves className="text-sky-500 w-6 h-6" />
            <span className="text-xl font-serif font-bold italic tracking-tight">Visit Tuzla</span>
          </div>
          <p className="text-slate-400 text-sm">
            Based on data from tztz.ba and panonika.ba. © 2026 Tuzla Travel Guide.
          </p>
        </div>
      </footer>
    </div>
  );
}
