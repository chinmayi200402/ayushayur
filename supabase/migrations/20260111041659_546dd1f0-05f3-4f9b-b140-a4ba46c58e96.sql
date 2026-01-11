-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  contact TEXT NOT NULL,
  blood_group TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create therapists table
CREATE TABLE public.therapists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
  specialization TEXT,
  contact TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_number TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('AC', 'Non-AC')),
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied', 'Maintenance')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create therapies table
CREATE TABLE public.therapies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  base_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  gender_restriction BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prakriti_assessments table
CREATE TABLE public.prakriti_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  vata_score INTEGER NOT NULL DEFAULT 0,
  pitta_score INTEGER NOT NULL DEFAULT 0,
  kapha_score INTEGER NOT NULL DEFAULT 0,
  assessment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responses JSONB
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapists(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  therapy_id UUID NOT NULL REFERENCES public.therapies(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled', 'In Progress')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create treatment_journey table
CREATE TABLE public.treatment_journey (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  therapy_id UUID REFERENCES public.therapies(id),
  prescribed_diet TEXT,
  session_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vitals table
CREATE TABLE public.vitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  pulse INTEGER,
  bp_systolic INTEGER,
  bp_diastolic INTEGER,
  appetite TEXT CHECK (appetite IN ('Good', 'Moderate', 'Poor')),
  notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inventory table
CREATE TABLE public.inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Tailam', 'Churna', 'Kashayam', 'Arishtam', 'Guggulu', 'Rasayana', 'Other')),
  quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'units',
  min_stock_level INTEGER NOT NULL DEFAULT 10,
  cost_per_unit DECIMAL(10,2) DEFAULT 0,
  supplier TEXT,
  last_restocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables (public access for now, will add auth later)
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prakriti_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Create public access policies (temporary - will add auth later)
CREATE POLICY "Public read access" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.patients FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.patients FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.therapists FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.therapists FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.therapists FOR UPDATE USING (true);

CREATE POLICY "Public read access" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.rooms FOR UPDATE USING (true);

CREATE POLICY "Public read access" ON public.therapies FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.therapies FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.therapies FOR UPDATE USING (true);

CREATE POLICY "Public read access" ON public.prakriti_assessments FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.prakriti_assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.prakriti_assessments FOR UPDATE USING (true);

CREATE POLICY "Public read access" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.appointments FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.appointments FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.treatment_journey FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.treatment_journey FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.treatment_journey FOR UPDATE USING (true);

CREATE POLICY "Public read access" ON public.vitals FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.vitals FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.vitals FOR UPDATE USING (true);

CREATE POLICY "Public read access" ON public.inventory FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.inventory FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.inventory FOR UPDATE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON public.inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.therapists (name, gender, specialization) VALUES
  ('Dr. Lakshmi Nair', 'Female', 'Panchakarma'),
  ('Dr. Rajesh Kumar', 'Male', 'Abhyanga'),
  ('Dr. Priya Sharma', 'Female', 'Shirodhara'),
  ('Dr. Arun Menon', 'Male', 'Basti');

INSERT INTO public.rooms (room_number, type, status) VALUES
  ('R-101', 'AC', 'Available'),
  ('R-102', 'AC', 'Available'),
  ('R-103', 'Non-AC', 'Available'),
  ('R-104', 'Non-AC', 'Available'),
  ('R-105', 'AC', 'Maintenance');

INSERT INTO public.therapies (name, duration_minutes, base_cost, gender_restriction, description) VALUES
  ('Abhyanga', 60, 1500.00, false, 'Full body oil massage'),
  ('Shirodhara', 45, 2000.00, false, 'Continuous flow of oil on forehead'),
  ('Panchakarma', 90, 5000.00, false, 'Complete detoxification therapy'),
  ('Udvartana', 60, 1800.00, true, 'Herbal powder massage'),
  ('Nasyam', 30, 800.00, false, 'Nasal administration of medicine'),
  ('Basti', 45, 2500.00, false, 'Medicated enema therapy'),
  ('Pizhichil', 75, 3500.00, false, 'Oil bath therapy');

INSERT INTO public.inventory (item_name, category, quantity, unit, min_stock_level) VALUES
  ('Dhanwantaram Tailam', 'Tailam', 8, 'liters', 15),
  ('Triphala Churna', 'Churna', 5, 'kg', 10),
  ('Ksheerabala Tailam', 'Tailam', 12, 'liters', 15),
  ('Ashwagandha Churna', 'Churna', 25, 'kg', 10),
  ('Dasamoolarishtam', 'Arishtam', 20, 'liters', 10),
  ('Brahmi Ghritam', 'Other', 8, 'kg', 10),
  ('Kaisora Guggulu', 'Guggulu', 3, 'kg', 5);