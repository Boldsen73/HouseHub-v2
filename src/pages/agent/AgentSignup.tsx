
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Building, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addTestUser, authenticateTestUser } from '@/utils/testData';
import { useTestAuth } from '@/hooks/useTestAuth';

const AgentSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useTestAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agency: '',
    primaryRegion: '',
    specialties: [] as string[],
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const regions = [
    'København',
    'Frederiksberg',
    'Nordsjælland',
    'Vestsjælland',
    'Østsjælland',
    'Bornholm',
    'Fyn',
    'Sydjylland',
    'Østjylland',
    'Vestjylland',
    'Nordjylland'
  ];

  const propertyTypes = [
    'Villa',
    'Rækkehus',
    'Lejlighed',
    'Sommerhus',
    'Erhverv',
    'Grund'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.name.trim()) newErrors.name = 'Navn er påkrævet';
    if (!formData.email.trim()) newErrors.email = 'Email er påkrævet';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon er påkrævet';
    if (!formData.agency.trim()) newErrors.agency = 'Mæglervirksomhed er påkrævet';
    if (!formData.primaryRegion) newErrors.primaryRegion = 'Primær region er påkrævet';
    if (!formData.password) newErrors.password = 'Adgangskode er påkrævet';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Bekræft adgangskode er påkrævet';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ugyldig email adresse';
    }

    // Phone validation
    if (formData.phone && !/^\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefonnummer skal være 8 cifre';
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Adgangskode skal være mindst 8 tegn';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Adgangskoder matcher ikke';
    }

    // Terms validation
    if (!acceptedTerms) {
      newErrors.terms = 'Du skal acceptere vilkårene';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Fejl i formularen",
        description: "Ret venligst fejlene og prøv igen.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create new agent user
      const newAgent = {
        id: `agent-${Date.now()}`,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: 'agent' as const,
        phone: formData.phone,
        company: formData.agency,
        primaryRegion: formData.primaryRegion,
        specialties: formData.specialties
      };

      // Add to test users
      addTestUser(newAgent);
      
      // Auto-login the new user
      const loginResult = await login(formData.email, formData.password);
      
      if (loginResult.success) {
        toast({
          title: "Profil oprettet!",
          description: "Din mæglerprofil er nu oprettet og du er logget ind.",
        });
      } else {
        throw new Error('Login fejlede efter oprettelse');
      }
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved oprettelse af profilen. Prøv igen.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specialties: checked
        ? [...prev.specialties, specialty]
        : prev.specialties.filter(s => s !== specialty)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Opret Mæglerprofil
            </h1>
            <p className="text-gray-600">
              Tilmeld dig og få adgang til nye kunder på HouseHub
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-center">Registrer dig som mægler</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Personlige oplysninger
                  </h3>
                  
                  <div>
                    <Label htmlFor="name">
                      Fulde navn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-red-500' : ''}
                      placeholder="Indtast dit fulde navn"
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email adresse <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                      placeholder="din@email.dk"
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      Telefonnummer <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                      placeholder="12 34 56 78"
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Professionelle oplysninger
                  </h3>
                  
                  <div>
                    <Label htmlFor="agency">
                      Mæglervirksomhed <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="agency"
                      type="text"
                      value={formData.agency}
                      onChange={(e) => handleInputChange('agency', e.target.value)}
                      className={errors.agency ? 'border-red-500' : ''}
                      placeholder="Navn på mæglervirksomhed"
                    />
                    {errors.agency && <p className="text-sm text-red-500 mt-1">{errors.agency}</p>}
                  </div>

                  <div>
                    <Label htmlFor="primaryRegion">
                      Primær region <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.primaryRegion} onValueChange={(value) => handleInputChange('primaryRegion', value)}>
                      <SelectTrigger className={errors.primaryRegion ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Vælg din primære region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.primaryRegion && <p className="text-sm text-red-500 mt-1">{errors.primaryRegion}</p>}
                  </div>

                  <div>
                    <Label>Specialer (vælg alle relevante)</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={formData.specialties.includes(type)}
                            onCheckedChange={(checked) => handleSpecialtyChange(type, checked as boolean)}
                          />
                          <Label htmlFor={type} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Adgangskode
                  </h3>
                  
                  <div>
                    <Label htmlFor="password">Adgangskode</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                      placeholder="Mindst 8 tegn"
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Bekræft adgangskode</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                      placeholder="Gentag adgangskode"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => {
                      setAcceptedTerms(checked as boolean);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className={errors.terms ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    Jeg accepterer <a href="/maegler/betingelser" className="text-blue-600 hover:underline">handelsbetingelserne</a> og <a href="/privacy" className="text-blue-600 hover:underline">privatlivspolitikken</a>
                  </Label>
                </div>
                {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Opretter profil...' : 'Opret mæglerprofil'}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Har du allerede en profil?{' '}
                  <a href="/maegler/login" className="text-blue-600 hover:underline font-medium">
                    Log ind her
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AgentSignup;
