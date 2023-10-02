import { DefaultBodyType, MockedRequest, RestHandler, SetupWorker } from "msw";
import { addCss, getButton, scaffoldHtml } from "./lib/htmlElements";
import { RenderFn, RenderFnParams } from "./types/ymock";
import { WINDOW_HEIGHT, WINDOW_NAME, WINDOW_WIDTH } from "./config/yMock";

export class YMock {
  private worker?: SetupWorker;
  private handlers?: RestHandler<MockedRequest<DefaultBodyType>>[];;
  private renderFn: RenderFn;
  private yMockWindow: Window | null = null;

  constructor(renderFn: RenderFn) {
    this.renderFn = renderFn;
  }

  /**
   * Setup ymock my bassing it msw worker and the static handlers
   */
  public load = ({ worker, handlers }: RenderFnParams) => {
    this.worker = worker;
    this.handlers = handlers;
    return this;
  };

  /**
   * Open a new window with ymock UI
   */
  public open = () => {
    if (!this.worker || !this.handlers) {
      console.warn("before calling YMock.open, please load msw worker and handlers using YMock.load()");
      return;
    }

    if (this.yMockWindow) {
      // already opened
      this.yMockWindow.focus();
      return;
    }

    this.yMockWindow = window.open("", WINDOW_NAME, `width=${WINDOW_WIDTH},height=${WINDOW_HEIGHT}`);

    if (this.yMockWindow) {
      scaffoldHtml(this.yMockWindow);
      addCss(this.yMockWindow);
      const root = this.renderFn(this.yMockWindow)({ worker: this.worker, handlers: this.handlers });
      this.yMockWindow.addEventListener("unload", (event) => {
        root.unmount();
        this.yMockWindow = null;
      });
    }

    return this;
  };

  public addButton = () => {
    const button = getButton(window);
    button.addEventListener('click', this.open.bind(this));
    return this;
  }
}
