import { Err, Ok, Result } from 'oxide.ts';

interface BatchOptions {
  batchSize: number;
  delay: number;
}

interface BatchResult<O> {
  success: O[];
  failures: Error[];
}

export const batchRequest = async <I, O>(
  records: I[],
  request: (record: I) => Promise<O>,
  options: BatchOptions,
): Promise<BatchResult<O>> => {
  let responses: Result<O, Error>[] = [];

  // let result: BatchResult<I, O>[] = []

  for (let i = 0; i < records.length; i += options.batchSize) {
    const batch = records.slice(i, i + options.batchSize);
    const result = await Promise.all(
      batch.map(async (record) => {
        return request(record)
          .then((res) => Ok(res))
          .catch((e) => Err(new Error(e)));
      }),
    );

    responses = responses.concat(result);
    await delay(options.delay, Unit.Miliseconds);
  }

  const success: O[] = [];
  const errors: Error[] = [];

  for (const res of responses) {
    if (res.isOk()) {
      success.push(res.unwrap());
    } else {
      errors.push(res.unwrapErr());
    }
  }

  return {
    success,
    failures: errors,
  };
};

export enum Unit {
  Miliseconds = 1,
  Seconds = 1000,
}

export const jsonRequest = <T>(data: T): RequestInit => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

export const jsonRequestNew = <T>(method: 'POST' | 'GET', data: T): RequestInit => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

export const delay = (duration: number, unit: Unit) => {
  return new Promise((resolve) => setTimeout(resolve, duration * unit));
};
