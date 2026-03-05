export default async function Page() {
  return (
    <div className="c-page c-page--uses">
      <header className="c-page__header">
        <div className="u-container">
          <h1 className='c-page__title'>My everyday work setup</h1>

          <div className="c-page__summary">
            <p>This is what I use to build things and to live my life. To say it&apos;s minimalistic would be an understatement.</p>
          </div>
        </div>
      </header>

      <div className="c-page__body">
        <div className="u-container">
          <h2>Hardware</h2>

          <p>2021 MacBook Pro 14-inch.</p>
          <p>That&apos;s it. No external monitor, no external keyboard, no external mouse. Just the laptop. 
            That&apos;s all I need.</p>
          <p>I use an iPhone 16 Pro Max and also I have some old iPad tucked away somewhere.</p>
          <p>You think I&apos;m a Apple fanboy, right?</p>

          <h2>Software</h2>

          <ul>
            <li>
              Browsers, all of them.
            </li>
            <li>
              Visual Studio Code, for coding.
            </li>
            <li>
              Hyper terminal + ZSH + Oh My ZSH.
            </li>
            <li>
              iA Writer for writing, journaling and note-taking, everything except for code.
            </li>
            <li>
              Slack, Discord, MS Teams, even Skype, for communication.
            </li>
            <li>
              Todoist for task management and reminders.
            </li>
          </ul>

          <h2>Services</h2>
          <ul>
            <li>
              Feedly, for RSS.
            </li>
            <li>
              Netflix, for background noise.
            </li>
            <li>
              Spotify, for road trips and working out.
            </li>
          </ul>

          <p>I&apos;m not trying to keep it simple, but this is all I need. I&apos;m so used to using some of them that 
            I think I couldn&apos;t function without them, but they&apos;re just tools and I do switch them every now and then.</p>
        </div>
      </div>
    </div>
  );
}