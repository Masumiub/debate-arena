'use client'


    const steps = [
        {
            photo: '/assets/icons8-debate-100.png',
            title: '1. Create a Debate',
            description:
                'Authenticated users can start a debate by submitting a title, description, category, tags, banner, and duration.',
        },
        {
            photo: '/assets/icons8-debate-100 (1).png',
            title: '2. Join a Side',
            description:
                'Pick your stance — Support or Oppose — and join the debate. You can only join one side per debate.',
        },
        {
            photo: '/assets/icons8-voter-100.png',
            title: '3. Post Your Arguments',
            description:
                'Post compelling arguments under your chosen side. Each argument shows your name, time, and votes.',
        },
        {
            photo: '/assets/icons8-vote-100.png',
            title: '4. Vote on Arguments',
            description:
                'Vote for arguments you find most persuasive. One vote per argument per user keeps it fair and competitive.',
        },
        {
            photo: '/assets/icons8-countdown-100.png',
            title: '5. Watch the Countdown',
            description:
                'Each debate has a timer. Once it ends, posting and voting are disabled and the winning side is declared.',
        },
        {
            photo: '/assets/icons8-scoreboard-100.png',
            title: '6. Climb the Scoreboard',
            description:
                'Earn votes and rise up the public leaderboard based on your debate activity and popularity.',
        },
    ]

    const HowItWorks = () => {
        return (
            <section className="py-16 px-4 bg-base-100 text-base-content">
                <div className="mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4"> How It Works</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-12">
                        Engage in thought-provoking debates and let your voice be heard. Here's a quick guide to get started:
                    </p>

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="card bg-base-200 shadow-md px-10 py-16 rounded-lg text-left hover:shadow-lg transition-all duration-300"
                            >
                                <img src={step.photo} alt="photo" className="my-3 w-12"/>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-500">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    export default HowItWorks;