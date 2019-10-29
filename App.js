import React, {Component, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// свойство - это то что один компанент передает другому
// состояние это то что находитьсч внутри компонента,это состояние можно передать в качестве пропсо нижестоящим элиментам

//Обьявлем класс, при данной инициализации надо писать больше вскго кода
// поскольку в setState передаем обьект а не функцию, в результате получаем асинхронный вывод
// тоесть, каждый раз менем прошлое значение стейта, и если в этой функции уже изменялся стейт
// это не будет иметь ни какого значения для нашего вычесления,
// тоесть значимо только изменения стейта вызванные последними

class Counter1 extends Component {
  // создаем конструктор, здесь инициализируем начальное состояние стейтов
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    // контекст
    this.inc = this.inc.bind(this);
    this.dic = this.dic.bind(this);
  }

  inc() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  // В этом примере мы увеличи стайт на -1, а не на -2 или -3
  dic() {
    this.setState({
      count: this.state.count - 2,
    });
    // вторым аргуметном можно вызвать еще что то, но делать это крайне не рекомендуеться
    this.setState(
      {
        count: this.state.count - 1,
      },
      Alert.alert('лучше не назначать второй аргумент'),
    );
  }

  render() {
    return (
      <View style={styles.counterStyle}>
        <TouchableOpacity style={styles.touchStyle} onPress={this.dic}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle2}>{this.state.count}</Text>
        <TouchableOpacity onPress={this.inc}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//Обьявлем класс, при данной инициализации надо писать больше вскго кода
//Поскольку в setState передаем не обьект а функцию, в результате получаем СИНХРОННЫЙ вывод,

class Counter2 extends Component {
  // создаем конструктор, здесь инициализируем начальное состояние стейтов
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    // контекст
    this.inc = this.inc.bind(this);
    this.dic = this.dic.bind(this);
  }

  dic() {
    this.setState((state, props) => {
      return {
        count: state.count - 1,
      };
    });
  }
  //поскольку вывод синхронный, то count увеличится на 2
  inc() {
    this.setState((state, props) => {
      return {
        count: state.count + 1,
      };
    });
    this.setState((state, props) => {
      return {
        count: state.count + 1,
      };
    });
  }

  render() {
    return (
      <View style={styles.counterStyle}>
        <TouchableOpacity style={styles.touchStyle} onPress={this.dic}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle2}>{this.state.count}</Text>
        <TouchableOpacity onPress={this.inc}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//Обьявлем класс,
// что бы избавиться от громозкого обьявления в начале и от контекста
// надо из простой функции сделать стрелочную
class Counter3 extends Component {
  state = {
    count: 0,
  };

  dic = () => {
    this.setState((state, props) => {
      return {
        count: state.count - 1,
      };
    });
  };

  inc = () => {
    this.setState((state, props) => {
      return {
        count: state.count + 1,
      };
    });
  };

  render() {
    return (
      <View style={styles.counterStyle}>
        <TouchableOpacity style={styles.touchStyle} onPress={this.dic}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle2}>{this.state.count}</Text>
        <TouchableOpacity onPress={this.inc}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//
// setState указываем только нужные свойтства, поскольку обьект, то {}
class Counter4 extends Component {
  state = {
    count: 0,
  };

  inc = () => {
    this.setState(({count}) => {
      return {
        count: count + 1,
      };
    });
  };

  dic = () => {
    this.setState(({count}) => {
      return {
        count: count - 1,
      };
    });
  };

  render() {
    return (
      <View style={styles.counterStyle}>
        <TouchableOpacity style={styles.touchStyle} onPress={this.dic}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle2}>{this.state.count}</Text>
        <TouchableOpacity onPress={this.inc}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// в dic() делаем запись еще компактне, как известно если в стрелочной функции есть только вывод,
// тоесть только return,  то ее можно записать как ()=()
class Counter5 extends Component {
  state = {
    count: 0,
  };

  inc = () => this.setState(({count}) => ({count: count - 1}));
  dic = () => this.setState(({count}) => ({count: count + 1}));

  render() {
    return (
      <View style={styles.counterStyle}>
        <TouchableOpacity style={styles.touchStyle} onPress={this.inc}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle2}>{this.state.count}</Text>
        <TouchableOpacity onPress={this.dic}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// изменяем состояние в нутри компонента описанного в виде фуекции
// с помощью хука из реакт
//хук принимает начальное состояние и возвращает текущее
//значение и метод который позволяет изменть текушие значение

// состояние не обьединяеться как в классах, а перезаписываеться
// для каждого свойства свой хук
const Counter6 = () => {
// вместо 0  в use State можно передать функцию
  const [count, setCount] = useState(0);
  // вызов АСИНХРОННЫЙ
  const dic = () => setCount(count + 1);
  // вызов СИНХРОННЫЙ поскольку передаем функцию
  const inc = () => setCount(prevCount => prevCount - 1);

  return (
    <View>
      <View style={styles.counterStyle}>
        <TouchableOpacity style={styles.touchStyle} onPress={inc}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle2}>{count}</Text>
        <TouchableOpacity onPress={dic}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// не содержит состояние, а получает его через пропсы из вышестоящих компонентов,
// за счет пропсов, тагже получает функции

const Counter7 = ({count, dic, inc}) => (
  <View>
    <View style={styles.counterStyle}>
      <TouchableOpacity style={styles.touchStyle} onPress={inc}>
        <Text style={styles.textStyle}>-</Text>
      </TouchableOpacity>
      <Text style={styles.textStyle2}>{count}</Text>
      <TouchableOpacity onPress={dic}>
        <Text style={styles.textStyle}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Title = ({name}) => (
  <View>
    <View style={styles.title}>
      <Text>{name}</Text>
    </View>
  </View>
);

export default function App() {
  const [count, setCount] = useState(0);
  const inc = () => setCount(prevCount => prevCount - 1);
  const dic = () => setCount(count + 1);

  return (
    <SafeAreaView>
      <ScrollView>
        <Title name={'Counter1'} />
        <Counter1 />
        <Title name={'Counter2'} />
        <Counter2 />
        <Title name={'Counter3'} />
        <Counter3 />
        <Title name={'Counter4'} />
        <Counter4 />
        <Title name={'Counter5'} />
        <Counter5 />
        <Title name={'Counter6'} />
        <Counter6 />
        <Title name={'Counter7'} />
        <Counter7 count={count} dic={dic} inc={inc} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(24,55,42,0.54)',
  },
  textStyle: {
    alignItems: 'center',
    paddingLeft: 60,
    paddingRight: 60,
    fontSize: 50,
  },
  textStyle2: {
    alignItems: 'center',
    fontSize: 50,
  },
  counterStyle: {
    backgroundColor: '#c1ecf4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  touchStyle: {
    borderRadius: 150,
  },
});
