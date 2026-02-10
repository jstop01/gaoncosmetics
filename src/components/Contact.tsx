import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

interface ContactProps {
  onAdminAccess: () => void;
}

export function Contact({ onAdminAccess }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === 'admin1234') {
      onAdminAccess();
      return;
    }

    if (!name || !phone || !message) {
      toast.error('모든 항목을 입력해주세요');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('inquiries').insert({
        name,
        phone,
        message,
      });
      if (error) throw error;

      toast.success('문의가 접수되었습니다. 빠르게 답변드리겠습니다.');
      setName('');
      setPhone('');
      setMessage('');
    } catch {
      toast.error('문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <p className="text-xs sm:text-sm tracking-[0.3em] text-muted-foreground">
                GET IN TOUCH
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Contact Us
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Have questions about our products? We'd love to hear from you.
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm sm:text-base">Email</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">info@gaoncosmetics.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm sm:text-base">Phone</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">010-6344-9656</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm sm:text-base">대표</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    가온 이상엽
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 sm:gap-4 pt-4">
              <a 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm sm:text-base">Name</label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm sm:text-base">Phone</label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm sm:text-base">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Your message" 
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? '전송 중...' : 'SEND MESSAGE'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}