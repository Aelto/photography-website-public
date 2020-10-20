import Menu from '/components/header.js';

const html = htm.bind(React.createElement);
const { useState, useEffect } = React;

function get_search() {
  if (!location.search) {
    return {};
  }

  return location.search
  .slice(1)
  .split('&')
  .map(s => s.split('='))
  .reduce((acc, [param, value]) => {
    acc[param] = value;

    return acc;
  }, {});
}


function App() {
  const [password_confirm, set_password_confirm] = useState('');
  const [password, set_password] = useState('');
  const [email, set_email] = useState('');
  const [hash, set_hash] = useState('');
  const [focus, set_focus] = useState(false);
  const [signin_message, set_signin_message] = useState('');
  const [signup_message, set_signup_message] = useState('');
  const [disable_email_input, set_disable_email_input] = useState(false)

  const search = get_search();

  /**
   * try to load email & hash values from url params or localstorage
   */
  useEffect(() => {
    if (search.email) {
      set_email(search.email);
      set_disable_email_input(true);
    }
    else if (localStorage.getItem('auth-email')) {
      set_email(localStorage.getItem('auth-email'));
    }

    if (search.hash) {
      set_hash(search.hash);
    }

    set_focus();
  }, []);

  /**
   * set focus on the right input on page load
   */
  useEffect(() => {
    const $hash = document.querySelector('#token-signup')
    if ($hash.value) {
      const $email = document.querySelector('#email-signup');

      if ($email.value) {
        const $password = document.querySelector('#password-signup');

        $password.focus();
      }
      else {
        $email.focus();
      }
    }
    else {
      const $email = document.querySelector('#email-signin');

      if ($email.value) {
        const $password = document.querySelector('#password-signin');

        $password.focus();
      }
      else {
        $email.focus();
      }
    }
  }, [focus])

  async function signin(e) {
    e.preventDefault();

    if (!email) {
      return set_signin_message(`you must enter an email`);
    }

    if (!password) {
      return set_signin_message(`you must enter a password`);
    }

    const body = {
      email,
      password
    };

    try {
      const response = await fetch('censored-url-to-api', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(body),
      });
      const json = await response.json();
  
      if (json.token) {
        document.cookie = `token=${json.token}; path=/private`;
        document.cookie = `token=${json.token}; path=/`;
  
        localStorage.setItem('auth-email', email);
  
        if (json.role === 0) {
          window.location.href = '/albums/';
        }
        else {
          window.location.href = '/censored-route';
        }
      }
      else {
        alert(JSON.stringify(json, null, ' '));
      }
    }
    catch (err) {
      set_signin_message(`an error occured: ${err}`);
    }
  }

  async function signup(e) {
    e.preventDefault();

    if (!email) {
      return set_signup_message(`you must enter an email`);
    }

    if (!password || password !== password_confirm) {
      return set_signup_message(`you must enter two matching passwords`);
    }

    if (!hash) {
      const body = {
        email,
        password
      };
    
      try {
        const response = await fetch('censored-url-to-api', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(body),
        });
        const json = await response.json();
    
        set_signup_message('account created successfully');
      }
      catch (err) {
        set_signup_message(`an error occured: ${err}`);
      }
    }
    else {
      const body = {
        email,
        password,
        hash
      };
    
      try {
        const response = await fetch('censored-url-to-api', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(body),
        });
        const json = await response.json();
    
        alert(JSON.stringify(json, null, ' '));
      }
      catch (err) {
        set_signup_message(`an error occured: ${err}`);
      }
    }
  }

  return html`
    <div id=page>
      <${Menu} />
      <h2>Authentication page</h2>

      <div className="forms-container">
        <div className="form">
          <h3>Connect using an account</h3>

          ${signin_message && html`<p>${signin_message}</p>`}
          
          <form onSubmit=${signin}>
            <fieldset>
              <legend>sign in</legend>

              <label htmlFor=email-signin>email</label>
              <input id=email-signin type="email" value=${email} onChange=${e => set_email(e.target.value)} />

              <label htmlFor="password-signin">password</label>
              <input id="password-signin" type="password" value=${password} onChange=${e => set_password(e.target.value)} />

              <input type="submit" value="sign in" />
            </fieldset>
          </form>
        </div>

        <div className="form-signup form">
          <h3>Create an account</h3>

          ${signup_message && html`<p>${signup_message}</p>`}

          <form onSubmit=${signup}>
            <fieldset>
              <legend>sign up</legend>

              <label htmlFor=token-signup>token</label>
              <input id=token-signup type="text" disabled value=${hash} />
    
              <label htmlFor="email-signup">email</label>
              <input id=email-signup type="email" disabled=${disable_email_input} value=${email} onChange=${e => set_email(e.target.value)} />
    
              <label htmlFor=password-signup>password</label>
              <input id=password-signup type="password" value=${password} onChange=${e => set_password(e.target.value)} />
    
              <label htmlFor=password-confirm-signup>confirm password</label>
              <input id=password-confirm-signup type="password" value=${password_confirm} onChange=${e => set_password_confirm(e.target.value)} />
    
              <button>create account</button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  `;
}

ReactDOM.render(
  html`<${App} />`,
  document.querySelector('#app')
);