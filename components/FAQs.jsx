'use client';

const FAQs = () => {
  return (
    <div className="w-full mx-auto mt-15">
      <h2 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

      <div className="space-y-4">
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I join a debate?
          </div>
          <div className="collapse-content text-sm">
            To join a debate, simply click on any open debate topic and choose a side (Support or Oppose). You’ll then be able to view and contribute arguments for your selected side.
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
            Can I change my side after joining a debate?
          </div>
          <div className="collapse-content text-sm">
            No, once you've chosen a side (Support or Oppose), you cannot switch for that particular debate. This ensures the integrity and consistency of the discussion.
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
            How does voting work on arguments?
          </div>
          <div className="collapse-content text-sm">
            You can vote on others' arguments by clicking the upvote or downvote buttons. You can’t vote on your own argument, and each user is limited to one vote per argument.
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
            Is there a time limit for editing or deleting my argument?
          </div>
          <div className="collapse-content text-sm">
          Yes. You can only edit or delete your argument within 5 minutes of posting. This encourages thoughtful and timely contributions.
          </div>
        </div>


        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
            Do I need an account to participate in debates?
          </div>
          <div className="collapse-content text-sm">
         Yes. You must sign in using Google to post arguments, join sides, or vote. This helps us ensure a safe and moderated community experience.
          </div>
        </div>


      </div>
    </div>
  );
};

export default FAQs;
