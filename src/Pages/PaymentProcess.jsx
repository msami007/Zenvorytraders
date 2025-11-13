// PaymentProcess.jsx
import React from 'react';

const PaymentProcess = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Process</h1>
          
          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
              <p className="mb-6">
                We offer secure and convenient payment options to make your shopping experience smooth and 
                hassle-free. All payments are processed through encrypted channels to ensure the security 
                of your financial information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accepted Payment Methods</h2>
              <p className="mb-4">We currently accept the following payment methods:</p>
              <ul className="list-disc list-inside space-y-3 ml-6 mb-4">
                <li>
                  <span className="font-semibold">Credit Cards:</span> Visa, MasterCard, American Express, Discover
                </li>
                <li>
                  <span className="font-semibold">Debit Cards:</span> All major debit cards with Visa or MasterCard logo
                </li>
                <li>
                  <span className="font-semibold">PayPal:</span> Secure payments through PayPal account
                </li>
                <li>
                  <span className="font-semibold">Apple Pay:</span> Quick and secure payments for Apple device users
                </li>
                <li>
                  <span className="font-semibold">Google Pay:</span> Convenient mobile payments for Android users
                </li>
                <li>
                  <span className="font-semibold">Bank Transfers:</span> Available for wholesale and bulk orders over $1,000
                </li>
                <li>
                  <span className="font-semibold">Store Credit:</span> Use your accumulated store credit for purchases
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Security</h2>
              <p className="mb-4">
                Your security is our top priority. We use industry-standard SSL (Secure Socket Layer) 
                encryption technology to protect your personal and payment information during transmission. 
                All payment information is encrypted and processed through PCI-DSS compliant payment processors.
              </p>
              <p className="mb-4">
                We do not store your complete credit card information on our servers. Your payment details 
                are securely handled by our payment partners who are certified to PCI Service Provider Level 1, 
                the most stringent level of certification available in the payments industry.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Processing</h2>
              <p className="mb-4">
                When you place an order, we will authorize your payment method for the total order amount. 
                The actual charge will be processed when your order ships. For pre-orders or backordered items, 
                your payment method will be charged at the time of purchase.
              </p>
              <p className="mb-4">Order processing timeline:</p>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
                <li>Orders placed before 2 PM EST are processed the same business day</li>
                <li>Orders placed after 2 PM EST are processed the next business day</li>
                <li>Weekend orders are processed on the following Monday</li>
                <li>Holiday periods may experience extended processing times</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Authorization</h2>
              <p className="mb-4">
                By providing a payment method, you confirm that you are authorized to use the payment method 
                and authorize us to charge your payment method for the total amount of your order (including 
                any applicable taxes, shipping fees, and other charges).
              </p>
              <p className="mb-4">
                If your payment method is declined, we will attempt to process your charge again after 24 hours. 
                If the second attempt fails, your order will be automatically cancelled, and you will need to 
                place a new order with an updated payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Currency and Pricing</h2>
              <p className="mb-4">
                All transactions are processed in US Dollars (USD). If you are paying with a credit card 
                issued in a different currency, your bank will convert the amount according to their current 
                exchange rates. Any currency conversion fees are the responsibility of the customer.
              </p>
              <p className="mb-4">
                We reserve the right to correct any pricing errors that may occur due to system glitches, 
                human error, or other factors. If a pricing error is discovered, we will notify you and 
                provide the option to proceed with the corrected price or cancel your order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sales Tax</h2>
              <p className="mb-4">
                Sales tax will be applied to orders shipped to addresses in states where we have a physical 
                presence or nexus. The applicable sales tax rate is determined by the shipping address and 
                will be calculated and displayed during checkout.
              </p>
              <p className="mb-4">
                For wholesale customers with valid resale certificates, sales tax will not be charged. 
                Please ensure your resale certificate is uploaded to your account before placing your order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Failed Payments</h2>
              <p className="mb-4">
                If your payment fails, you will receive an email notification with details about the failure. 
                Common reasons for payment failures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
                <li>Insufficient funds in your account</li>
                <li>Incorrect card information entered</li>
                <li>Card expiration date has passed</li>
                <li>Bank or credit card company has blocked the transaction</li>
                <li>Billing address does not match the address on file with your bank</li>
                <li>Daily transaction limit exceeded</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Processing</h2>
              <p className="mb-4">
                Refunds are processed to the original payment method used for the purchase. The time it 
                takes for the refund to appear in your account depends on your financial institution:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
                <li>Credit card refunds: 5-7 business days</li>
                <li>Debit card refunds: 7-10 business days</li>
                <li>PayPal refunds: 3-5 business days</li>
                <li>Bank transfer refunds: 7-14 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Wholesale and Bulk Orders</h2>
              <p className="mb-4">
                For wholesale customers and bulk orders over $5,000, we offer additional payment options:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
                <li>Net 30 payment terms for qualified businesses</li>
                <li>Wire transfers for domestic and international orders</li>
                <li>ACH transfers for domestic customers</li>
                <li>Split payments across multiple credit cards</li>
                <li>Purchase orders for government and educational institutions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need Help with Payments?</h2>
              <p className="mb-2">
                If you have any questions or need assistance with the payment process, please contact our 
                customer support team:
              </p>
              <p className="text-blue-600 font-medium mb-2">sales@mejistify.com</p>
              <p className="text-blue-600 font-medium">+1 (512) 5430711</p>
              <p className="mt-4 text-sm text-gray-600">
                Our customer support team is available Monday through Friday, 9:00 AM to 6:00 PM EST.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;