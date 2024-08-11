import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
    const proof = await request.json();
    console.log('Received proof:', proof);
    const worldcoinRequest = await fetch(
      `https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_APP_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proof),
      }
    );
    console.log(worldcoinRequest);
    
    if (worldcoinRequest.ok) {
      const { verified } = await worldcoinRequest.json();
      console.log(verified);
    
      return NextResponse.json({ verify: verified }, { status: 200 })
    } else {
      const worldcoinResponse = await worldcoinRequest.json();
      console.log(worldcoinResponse.statusText);

      
      return NextResponse.json({ error: worldcoinResponse.statusText }, { status: worldcoinResponse.status })

    }
}