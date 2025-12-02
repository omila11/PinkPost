import React, { useState } from 'react';
import '../styles/FAQs.css';
import Navbar from '../components/Navbar';
import FooterLinks from '../components/FooterLinks';

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = [
    {
      category: 'Ordering & Payment',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our curated gift boxes or building your own custom box. Simply add items to your cart and proceed to checkout. You\'ll need to provide shipping information and payment details to complete your order.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted for your protection.'
        },
        {
          question: 'Can I modify or cancel my order after placing it?',
          answer: 'Orders can be modified or cancelled within 2 hours of placement. Please contact us immediately at hello@pinkpost.com or call +1 (234) 567-890 if you need to make changes.'
        },
        {
          question: 'Do you offer gift wrapping?',
          answer: 'Yes! All our gift boxes come beautifully wrapped and ready to gift. We include a personalized message card at no additional charge. Just add your message at checkout.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days. Express shipping (2-3 business days) and overnight shipping options are available at checkout for an additional fee.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within the United States. We\'re working on expanding our shipping options to include international destinations in the near future.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a confirmation email with a tracking number. You can use this number to track your package on our website or directly with the shipping carrier.'
        },
        {
          question: 'What if my order arrives damaged?',
          answer: 'We take great care in packaging our gift boxes, but if your order arrives damaged, please contact us within 48 hours with photos. We\'ll send a replacement or issue a full refund immediately.'
        }
      ]
    },
    {
      category: 'Custom Gift Boxes',
      questions: [
        {
          question: 'How does the custom gift box builder work?',
          answer: 'Our custom gift box builder allows you to create a personalized gift in three simple steps: 1) Choose your box size, 2) Select items from our curated collection, and 3) Add a personal message. You can preview your creation before checkout.'
        },
        {
          question: 'Is there a minimum or maximum number of items?',
          answer: 'The number of items depends on the box size you choose. Small boxes hold 3-5 items, medium boxes hold 6-8 items, and large boxes can accommodate 9-12 items.'
        },
        {
          question: 'Can I request specific items not listed?',
          answer: 'For special requests or corporate gifting needs, please contact our customer service team. We\'re happy to source specific items or create custom solutions for bulk orders.'
        },
        {
          question: 'How much does a custom box cost?',
          answer: 'Custom box pricing depends on the items you select. Box prices start at $45 for a small box, $75 for medium, and $120 for large. Individual item prices are displayed during selection.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We want you to love your Pink Post gift! If you\'re not completely satisfied, you can return unopened items within 30 days of delivery for a full refund. Personalized items are not eligible for return.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Contact our customer service team at hello@pinkpost.com with your order number. We\'ll provide a prepaid return shipping label and process your refund once we receive the items.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.'
        },
        {
          question: 'Can I exchange an item?',
          answer: 'Yes! If you\'d like to exchange an item for a different product, please contact us. We\'ll arrange the exchange and cover any price difference if needed.'
        }
      ]
    }
  ];

  return (
    <div className="faqs-page">
      <Navbar />
      
      <div className="faqs-container">
        <div className="faqs-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our gift boxes, ordering process, and more. Can't find what you're looking for? Contact us directly!</p>
        </div>

        <div className="faqs-content">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category-section">
              <h2 className="faq-category-title">{category.category}</h2>
              <div className="faq-list">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={questionIndex} className={`faq-item ${isOpen ? 'active' : ''}`}>
                      <button 
                        className="faq-question"
                        onClick={() => toggleFAQ(globalIndex)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <svg 
                          className={`faq-icon ${isOpen ? 'open' : ''}`}
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="faqs-cta">
          <h2>Still have questions?</h2>
          <p>Our customer service team is here to help!</p>
          <button className="contact-cta-btn" onClick={() => window.location.href = '/contact'}>
            Contact Us
          </button>
        </div>
      </div>

      <FooterLinks />
    </div>
  );
}

export default FAQs;
