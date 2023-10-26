import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get("/ok", () => {
    return HttpResponse.text("ok");
  }),

  http.post("/ok", () => {
    return HttpResponse.text("ok");
  }),

  http.get("/some/json", () => {
    return HttpResponse.json({
      usedMethod: 'get',
      property1: 'value',
      property2: 1234,
      property3: {
        key: "value"
      }
    })
  }),

  http.post("/some/json", () => {
    return HttpResponse.json({
      usedMethod: 'post',
      property1: 'value',
      property2: 1234,
      property3: {
        key: "value"
      }
    })
  }),

  http.put("/some/json", () => {
    return HttpResponse.json({
      usedMethod: 'put',
      property1: 'value',
      property2: 1234,
      property3: {
        key: "value"
      }
    })
  }),

  http.patch("/some/json", () => {
    return HttpResponse.json({
      usedMethod: 'patch',
      property1: 'value',
      property2: 1234,
      property3: {
        key: "value"
      }
    })
  }),

  http.delete("/some/json", () => {
    return HttpResponse.json({
      usedMethod: 'delete',
      property1: 'value',
      property2: 1234,
      property3: {
        key: "value"
      }
    })
  }),

  http.get("/some/text", () => {
    return HttpResponse.text("Mocked response text")
  }),

  http.get("/some/xml", () => {
    return HttpResponse.text(`
      <response>
        <property>xml node</property>
      </response>
    `)
  }),

  http.get('/some/form-data', () => {
    const form = new FormData();
    form.append('id', 'abc-123');
    form.append('title', 'Modern Testing Practices');

    HttpResponse.formData(form)
  }),

  http.get('/application/error/unauthorized', () => {
    return new HttpResponse(null, { status: 401 })
  }),

  http.post('/application/error/unauthorized', () => {
    return new HttpResponse(null, { status: 401 })
  }),

  http.get('/application/error/bad-request', () => {
    return new HttpResponse("mocked bad request error", { status: 400 })
  }),

  http.get('/network/error', () => {
    return HttpResponse.error();
  })
];
