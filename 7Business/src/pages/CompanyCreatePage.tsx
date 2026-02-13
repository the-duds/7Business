import { useNavigate } from 'react-router-dom';
import { CompanyForm } from '@/components/CompanyForm';

export function CompanyCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    console.log('Company created:', data);
    navigate('/companies');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <CompanyForm onSubmit={handleSubmit} onClose={() => navigate('/companies')} />
    </div>
  );
}
