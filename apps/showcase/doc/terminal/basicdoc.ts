import { Code } from '@/domain/code';
import { Component, OnDestroy } from '@angular/core';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';

@Component({
    selector: 'basic-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Commands are processed using observables via the <i>TerminalService</i>. Import this service into your component and subscribe to <i>commandHandler</i> to process commands by sending replies with <i>sendResponse</i> function.</p>
        </app-docsectiontext>
        <div class="card">
            <p>Enter "<strong>date</strong>" to display the current date, "<strong>greet &#123;0&#125;</strong>" for a message and "<strong>random</strong>" to get a random number.</p>
            <p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $" />
        </div>
        <app-code [code]="code" selector="terminal-basic-demo"></app-code>
    `,
    providers: [TerminalService]
})
export class BasicDoc implements OnDestroy {
    subscription: Subscription;

    constructor(private terminalService: TerminalService) {
        this.subscription = this.terminalService.commandHandler.subscribe((text) => {
            let response;
            let argsIndex = text.indexOf(' ');
            let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

            switch (command) {
                case 'date':
                    response = 'Today is ' + new Date().toDateString();
                    break;

                case 'greet':
                    response = 'Hola ' + text.substring(argsIndex + 1);
                    break;

                case 'random':
                    response = Math.floor(Math.random() * 100);
                    break;

                default:
                    response = 'Unknown command: ' + command;
            }
            this.terminalService.sendResponse(response);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    code: Code = {
        basic: `<p>Enter "<strong>date</strong>" to display the current date,
"<strong>greet &#123;0&#125;</strong>" for a message and "<strong>random</strong>"
to get a random number.</p>
<p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $" />`,
        html: `<div class="card">
    <p>Enter "<strong>date</strong>" to display the current date,
    "<strong>greet &#123;0&#125;</strong>" for a message and "<strong>random</strong>"
    to get a random number.</p>
    <p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $" />
</div>`,
        typescript: `import { Component, OnDestroy } from '@angular/core';
import { TerminalService } from 'primeng/terminal';
import { Terminal } from 'primeng/terminal';
import { Subscription } from 'rxjs';

@Component({
    selector: 'terminal-basic-demo',
    templateUrl: './terminal-basic-demo.html',
    standalone: true,
    imports: [Terminal],
    providers: [TerminalService]
})
export class TerminalBasicDemo implements OnDestroy {
    subscription: Subscription;

    constructor(private terminalService: TerminalService) {
        this.subscription = this.terminalService.commandHandler.subscribe((command) => {
            let response = command === 'date' ? new Date().toDateString() : 'Unknown command: ' + command;
            this.terminalService.sendResponse(response);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}`
    };
}
