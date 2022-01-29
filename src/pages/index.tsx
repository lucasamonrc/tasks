export default function Home() {
  return (
    <div>
      <header>
        <nav>
          <h1>✅ Tasks</h1>
          <button>logout</button>
        </nav>
      </header>

      <section>
        <header>
          <h2>To do:</h2>

          <section>
            <div>
              <input type="checkbox" />
              <label>Sort by date</label>
            </div>

            <div>
              <input type="checkbox" />
              <label>Filter completed</label>
            </div>
          </section>
        </header>

        <main>
          <ul>
            <li>
              <div>
                <input type="checkbox" />
                <label>Some task</label>
              </div>
              <time>2020-01-01</time>
              <button>delete</button>
            </li>
          </ul>
        </main>

        <footer>
          <form>
            <input type="text" required />
            <input type="date" required />
            <button type="submit"></button>
          </form>
        </footer>
      </section>
    </div>
  );
}
