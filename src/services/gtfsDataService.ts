// GTFS Data Service for KMRL Open Data

export interface GTFSAgency {
  agency_id: string;
  agency_name: string;
  agency_url: string;
  agency_timezone: string;
  agency_lang?: string;
}

export interface GTFSRoute {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_desc?: string;
  route_type: string;
  route_url?: string;
  route_color?: string;
  route_text_color?: string;
}

export interface GTFSStop {
  stop_id: string;
  stop_code?: string;
  stop_name: string;
  stop_desc?: string;
  stop_lat: number;
  stop_lon: number;
  zone_id?: string;
  stop_url?: string;
  location_type?: string;
  parent_station?: string;
}

export interface GTFSTrip {
  route_id: string;
  service_id: string;
  trip_id: string;
  trip_headsign?: string;
  trip_short_name?: string;
  direction_id?: string;
  block_id?: string;
  shape_id?: string;
}

export interface GTFSStopTime {
  trip_id: string;
  arrival_time: string;
  departure_time: string;
  stop_id: string;
  stop_sequence: number;
  stop_headsign?: string;
  pickup_type?: string;
  drop_off_type?: string;
  shape_dist_traveled?: number;
}

export interface GTFSCalendar {
  service_id: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  start_date: string;
  end_date: string;
}

export interface ProcessedScheduleData {
  time: string;
  blueLine: number;
  greenLine: number;
  demand: number;
  predicted: number;
}

export interface ProcessedPassengerData {
  time: string;
  passengers: number;
  predicted: number;
}

class GTFSDataService {
  private data: {
    agencies: GTFSAgency[];
    routes: GTFSRoute[];
    stops: GTFSStop[];
    trips: GTFSTrip[];
    stopTimes: GTFSStopTime[];
    calendar: GTFSCalendar[];
  } = {
    agencies: [],
    routes: [],
    stops: [],
    trips: [],
    stopTimes: [],
    calendar: []
  };

  async loadGTFSData(): Promise<void> {
    try {
      // In a real implementation, you would extract and parse the ZIP file
      // For now, we'll use mock data that represents the structure of KMRL data
      this.data = {
        agencies: [
          {
            agency_id: "KMRL",
            agency_name: "Kochi Metro Rail Limited",
            agency_url: "https://kochimetro.org",
            agency_timezone: "Asia/Kolkata",
            agency_lang: "en"
          }
        ],
        routes: [
          {
            route_id: "BLUE_LINE",
            agency_id: "KMRL",
            route_short_name: "Blue Line",
            route_long_name: "Aluva - Pettah",
            route_desc: "Main metro line connecting Aluva to Pettah",
            route_type: "1",
            route_color: "0066CC",
            route_text_color: "FFFFFF"
          },
          {
            route_id: "GREEN_LINE",
            agency_id: "KMRL",
            route_short_name: "Green Line",
            route_long_name: "Pettah - Tripunithura",
            route_desc: "Metro line from Pettah to Tripunithura",
            route_type: "1",
            route_color: "00AA00",
            route_text_color: "FFFFFF"
          }
        ],
        stops: this.generateMockStops(),
        trips: this.generateMockTrips(),
        stopTimes: this.generateMockStopTimes(),
        calendar: this.generateMockCalendar()
      };
    } catch (error) {
      console.error('Error loading GTFS data:', error);
      throw error;
    }
  }

  private generateMockStops(): GTFSStop[] {
    const blueLineStops = [
      "Aluva", "Pulinchodu", "Companypady", "Ambattukavu", "Muttom",
      "Kalamassery", "Cochin University", "Pathadipalam", "Edapally",
      "Changampuzha Park", "Palarivattom", "JLN Stadium", "Kaloor",
      "Town Hall", "MG Road", "Maharajas"
    ];

    const greenLineStops = [
      "Pettah", "Vadakkekotta", "SN Junction", "CUSAT", "Kalamassery",
      "Thrikkakara", "Kakkanad", "Collectorate", "Changampuzha Park",
      "Palarivattom", "JLN Stadium", "Kaloor", "Lissie", "Town Hall",
      "MG Road", "Maharajas", "Ernakulam South", "Kadavanthra", 
      "Elamkulam", "Vyttila", "Thaikoodam", "Petta", "Vytilla Mobility Hub",
      "Tripunithura"
    ];

    const stops: GTFSStop[] = [];
    
    blueLineStops.forEach((name, index) => {
      stops.push({
        stop_id: `BL_${index + 1}`,
        stop_name: name,
        stop_lat: 10.0 + (index * 0.01),
        stop_lon: 76.2 + (index * 0.01),
        zone_id: "1"
      });
    });

    greenLineStops.forEach((name, index) => {
      stops.push({
        stop_id: `GL_${index + 1}`,
        stop_name: name,
        stop_lat: 9.9 + (index * 0.008),
        stop_lon: 76.25 + (index * 0.008),
        zone_id: "1"
      });
    });

    return stops;
  }

  private generateMockTrips(): GTFSTrip[] {
    const trips: GTFSTrip[] = [];
    
    // Generate trips for Blue Line
    for (let i = 1; i <= 50; i++) {
      trips.push({
        route_id: "BLUE_LINE",
        service_id: "WEEKDAY",
        trip_id: `BL_TRIP_${i}`,
        trip_headsign: i % 2 === 0 ? "Pettah" : "Aluva",
        direction_id: i % 2 === 0 ? "1" : "0"
      });
    }

    // Generate trips for Green Line
    for (let i = 1; i <= 30; i++) {
      trips.push({
        route_id: "GREEN_LINE",
        service_id: "WEEKDAY",
        trip_id: `GL_TRIP_${i}`,
        trip_headsign: i % 2 === 0 ? "Tripunithura" : "Pettah",
        direction_id: i % 2 === 0 ? "1" : "0"
      });
    }

    return trips;
  }

  private generateMockStopTimes(): GTFSStopTime[] {
    // This would contain actual schedule data from GTFS
    // For demonstration, we'll generate basic stop times
    return [];
  }

  private generateMockCalendar(): GTFSCalendar[] {
    return [
      {
        service_id: "WEEKDAY",
        monday: "1",
        tuesday: "1",
        wednesday: "1",
        thursday: "1",
        friday: "1",
        saturday: "0",
        sunday: "0",
        start_date: "20240101",
        end_date: "20241231"
      },
      {
        service_id: "WEEKEND",
        monday: "0",
        tuesday: "0",
        wednesday: "0",
        thursday: "0",
        friday: "0",
        saturday: "1",
        sunday: "1",
        start_date: "20240101",
        end_date: "20241231"
      }
    ];
  }

  getRoutes(): GTFSRoute[] {
    return this.data.routes;
  }

  getStops(): GTFSStop[] {
    return this.data.stops;
  }

  getTrips(): GTFSTrip[] {
    return this.data.trips;
  }

  getStopsForRoute(routeId: string): GTFSStop[] {
    return this.data.stops.filter(stop => 
      routeId === "BLUE_LINE" ? stop.stop_id.startsWith("BL_") : 
      routeId === "GREEN_LINE" ? stop.stop_id.startsWith("GL_") : false
    );
  }

  getProcessedScheduleData(): ProcessedScheduleData[] {
    const currentTime = new Date();
    const scheduleData: ProcessedScheduleData[] = [];

    for (let i = 0; i < 24; i++) {
      const hour = String(i).padStart(2, '0');
      const time = `${hour}:00`;
      
      // Calculate train frequency based on time of day
      let blueLineFreq = 0;
      let greenLineFreq = 0;
      let demand = 0;

      if (i >= 6 && i <= 9) { // Morning peak
        blueLineFreq = 12;
        greenLineFreq = 8;
        demand = 800;
      } else if (i >= 17 && i <= 20) { // Evening peak
        blueLineFreq = 10;
        greenLineFreq = 6;
        demand = 750;
      } else if (i >= 10 && i <= 16) { // Day time
        blueLineFreq = 6;
        greenLineFreq = 4;
        demand = 400;
      } else { // Off peak
        blueLineFreq = 2;
        greenLineFreq = 1;
        demand = 100;
      }

      scheduleData.push({
        time,
        blueLine: blueLineFreq,
        greenLine: greenLineFreq,
        demand,
        predicted: demand + Math.random() * 100 - 50
      });
    }

    return scheduleData;
  }

  getProcessedPassengerData(): ProcessedPassengerData[] {
    const passengerData: ProcessedPassengerData[] = [];
    const currentTime = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentTime);
      date.setDate(currentTime.getDate() - (6 - i));
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Weekend vs weekday passenger patterns
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const basePassengers = isWeekend ? 15000 : 45000;
      const variance = basePassengers * 0.1;
      
      const passengers = Math.floor(basePassengers + (Math.random() * variance * 2 - variance));
      const predicted = Math.floor(passengers + (Math.random() * 2000 - 1000));

      passengerData.push({
        time: dayName,
        passengers,
        predicted
      });
    }

    return passengerData;
  }

  getSystemStats() {
    return {
      totalPassengers: "45,234",
      activeTrains: this.data.trips.length,
      onTimePerformance: 94,
      energySavings: 23,
      routes: this.data.routes.length,
      stops: this.data.stops.length
    };
  }
}

export const gtfsDataService = new GTFSDataService();