// import { EmailTemplate } from '../../../components/EmailTemplate';
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    console.log("Init api/send/route.ts");
    const fakeData = {
        orderId: 'clzcwqx3h000b13ss761s4izd',
        orderDate: new Date().toLocaleDateString(),
        shippingAddress: {
            id: '',
            name: 'Frodo Fergusson',
            city: 'Arizona City',
            country: 'US',
            postalCode: '85123',
            street: 'West Madero Drive',
            state: 'AZ',
            phoneNumber: '',
        },
    }
    try {
        const { data, error } = await resend.emails.send({
            from: 'Rank Digital <rankdigital@resend.dev>',
            to: ['lhc.developerweb@gmail.com'],
            subject: 'Hello world',
            react: OrderReceivedEmail(fakeData),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        console.log("Data res: ", data);

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
